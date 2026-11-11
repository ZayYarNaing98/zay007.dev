import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

/**
 * Page-view counter for zayarnaing.com.
 *
 * One Durable Object instance per site holds the count in SQLite, so every
 * increment is atomic. The site's Worker calls this Worker over a service
 * binding (RPC); there is no public URL.
 */
export class ViewCounter extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		ctx.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY CHECK (id = 1), views INTEGER NOT NULL)",
		);
	}

	/** Current count, without changing it. */
	get(): number {
		const row = this.ctx.storage.sql.exec<{ views: number }>("SELECT views FROM counter WHERE id = 1").toArray()[0];
		return row?.views ?? 0;
	}

	/** Add one view and return the new count. */
	hit(): number {
		return this.ctx.storage.sql
			.exec<{ views: number }>(
				"INSERT INTO counter (id, views) VALUES (1, 1) ON CONFLICT (id) DO UPDATE SET views = views + 1 RETURNING views",
			)
			.one().views;
	}
}

const SITE = "zayarnaing.com";

/** RPC interface used by the site's Worker through its `VIEWS` service binding. */
export default class extends WorkerEntrypoint<Env> {
	get(): Promise<number> {
		return this.env.VIEW_COUNTER.getByName(SITE).get();
	}

	hit(): Promise<number> {
		return this.env.VIEW_COUNTER.getByName(SITE).hit();
	}

	fetch(): Response {
		return new Response("Not found", { status: 404 });
	}
}
