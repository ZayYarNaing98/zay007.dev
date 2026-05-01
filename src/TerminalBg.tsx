import { useEffect, useRef, useState } from 'react'

const PROMPT = 'zayyarnaing@zay007:~$'

const COMMANDS = [
  'ls -la /opt/app',
  'git status',
  'git log --oneline -8',
  'git push origin main',
  'docker ps -a',
  'docker-compose up -d',
  'kubectl get pods -A',
  'kubectl apply -f deployment.yaml',
  'npm run build',
  'npm install',
  'terraform plan',
  'terraform apply --auto-approve',
  'ssh deploy@prod-server',
  'systemctl status nginx',
  'systemctl restart nginx',
  'cat /etc/os-release',
  'uname -a',
  'df -h',
  'free -m',
  'htop',
  'ping -c 3 google.com',
  'aws s3 ls s3://my-bucket',
  'aws ec2 describe-instances',
  'grep -r "ERROR" /var/log/nginx/',
  'tail -f /var/log/syslog',
  'chmod +x deploy.sh && ./deploy.sh',
  'mkdir -p /opt/services && cd /opt/services',
  'curl -s http://localhost:3000/health',
  'ps aux | grep node',
  'netstat -tulpn | grep 8080',
  'sudo journalctl -u myapp -f',
  'export NODE_ENV=production',
  'source ~/.zshrc',
]

interface Line {
  id: number
  prompt: string
  command: string
  opacity: number
}

let idCounter = 0

export default function TerminalBg() {
  const [lines, setLines] = useState<Line[]>([])
  const cmdIndexRef = useRef(0)

  useEffect(() => {
    const add = () => {
      const cmd = COMMANDS[cmdIndexRef.current % COMMANDS.length]
      cmdIndexRef.current++
      const id = idCounter++

      setLines(prev => {
        const next = [...prev, { id, prompt: PROMPT, command: cmd, opacity: 1 }]
        return next.slice(-28)
      })
    }

    add()
    const interval = setInterval(add, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="terminal-bg" aria-hidden="true">
      <div className="terminal-lines">
        {lines.map((line, i) => {
          const age = lines.length - 1 - i
          const opacity = Math.max(0.04, 0.55 - age * 0.025)
          return (
            <div key={line.id} className="terminal-line" style={{ opacity }}>
              <span className="t-prompt">{line.prompt}</span>
              <span className="t-cmd"> {line.command}</span>
            </div>
          )
        })}
        <div className="terminal-line">
          <span className="t-prompt">{PROMPT}</span>
          <span className="t-cursor"> ▌</span>
        </div>
      </div>
    </div>
  )
}
