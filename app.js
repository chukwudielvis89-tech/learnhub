// ===== STATE =====
let state = JSON.parse(localStorage.getItem('learnhub') || '{}');
if(!state.xp) state.xp = 0;
if(!state.lessons) state.lessons = [];
if(!state.quizzes) state.quizzes = 0;
if(!state.streak) state.streak = 1;

function saveState() { localStorage.setItem('learnhub', JSON.stringify(state)); }

// ===== SPLASH =====
setTimeout(() => {
  document.getElementById('splash').classList.add('hide');
  updateUI();
}, 2000);

function updateUI() {
  document.getElementById('xp-display').textContent = `⚡ ${state.xp} XP`;
  document.getElementById('streak-num').textContent = state.streak;
  document.getElementById('stat-lessons').textContent = state.lessons.length;
  document.getElementById('stat-xp').textContent = state.xp;
  document.getElementById('stat-streak2').textContent = state.streak;
  document.getElementById('stat-quizzes').textContent = state.quizzes;

  const done = {cyber:0, hacking:0, coding:0, content:0};
  state.lessons.forEach(l => {
    const lesson = LESSONS[l];
    if(lesson) done[lesson.cat] = (done[lesson.cat]||0)+1;
  });
  const setBar = (id, cat, total) => {
    const pct = Math.round((done[cat]||0)/total*100);
    document.getElementById(`pb-${id}`).style.width = pct+'%';
    document.getElementById(`pb-${id}-label`).textContent = pct+'%';
  };
  setBar('cyber','cyber',12); setBar('hack','hacking',10);
  setBar('code','coding',15); setBar('content','content',8);

  if(state.lessons.length >= 1) document.getElementById('ach-first').classList.remove('locked');
  if(state.lessons.length >= 5) document.getElementById('ach-hacker').classList.remove('locked');
  if(state.quizzes >= 3) document.getElementById('ach-quiz').classList.remove('locked');
  if(state.streak >= 7) document.getElementById('ach-streak').classList.remove('locked');
}

// ===== NAVIGATION =====
function switchPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  btn.classList.add('active');
}

function goToLearn(cat) {
  const titles = {cyber:'🛡️ Cybersecurity', hacking:'💻 Ethical Hacking', coding:'⚙️ Coding', content:'🎬 Content Creation'};
  document.getElementById('learn-title').textContent = titles[cat] || 'All Topics';
  document.getElementById('learn-sub').textContent = 'Select a lesson to begin';
  renderTopics(cat);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-learn').classList.add('active');
  document.querySelectorAll('.nav-btn')[1].classList.add('active');
}

// ===== LESSONS DATA =====
const LESSONS = {
  'what-is-hacking': {
    cat:'hacking', title:'What is Ethical Hacking?', level:'beginner',
    icon:'💻', desc:'Learn the basics of ethical hacking and what it means',
    content: `
      <h3>// WHAT IS ETHICAL HACKING?</h3>
      <p>Ethical hacking (also called penetration testing or white-hat hacking) is the practice of intentionally probing computer systems, networks, or applications to find security vulnerabilities — but with <strong>permission</strong>.</p>
      <div class="tip-box">Ethical hackers do the same things as malicious hackers, but they have legal authorization and report findings to help fix the vulnerabilities.</div>
      <h3>// WHY IT MATTERS</h3>
      <p>Every major company — Google, Facebook, governments — hire ethical hackers to find weaknesses before criminals do. It's one of the highest-paying careers in tech.</p>
      <h3>// TYPES OF HACKERS</h3>
      <ul>
        <li><strong>White Hat</strong> — Ethical hackers. Work with permission. Legal ✅</li>
        <li><strong>Black Hat</strong> — Malicious hackers. No permission. Illegal ❌</li>
        <li><strong>Grey Hat</strong> — In between. May hack without permission but don't cause damage</li>
      </ul>
      <h3>// KEY CONCEPTS</h3>
      <ul>
        <li>Vulnerability — A weakness in a system</li>
        <li>Exploit — Taking advantage of a vulnerability</li>
        <li>Payload — The code delivered through an exploit</li>
        <li>Penetration Test — A simulated cyberattack</li>
      </ul>
      <div class="warn-box">Always get written permission before testing any system. Unauthorized hacking is illegal everywhere.</div>
      <h3>// THE 5 PHASES</h3>
      <ul>
        <li>1️⃣ Reconnaissance — Gather information</li>
        <li>2️⃣ Scanning — Discover open ports and services</li>
        <li>3️⃣ Gaining Access — Exploit vulnerabilities</li>
        <li>4️⃣ Maintaining Access — Stay in the system</li>
        <li>5️⃣ Covering Tracks — Remove evidence</li>
      </ul>
      <div class="quiz-section">
        <div class="quiz-title">// QUICK QUIZ</div>
        <div class="quiz-q">What makes ethical hacking legal?</div>
        <div class="quiz-opts">
          <button class="quiz-opt" onclick="checkAnswer(this, false)">Using special hacking software</button>
          <button class="quiz-opt" onclick="checkAnswer(this, true)">Having written permission from the owner</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">Only hacking government systems</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">Not stealing any data</button>
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>`
  },
  'python-basics': {
    cat:'coding', title:'Python in 10 Minutes', level:'beginner',
    icon:'🐍', desc:'Get started with Python programming quickly',
    content: `
      <h3>// WHY PYTHON?</h3>
      <p>Python is the #1 language for cybersecurity, automation, AI, and hacking. It's easy to read, powerful, and used by everyone from beginners to NASA engineers.</p>
      <h3>// YOUR FIRST PROGRAM</h3>
      <div class="code-block">print("Hello, Hacker!")</div>
      <h3>// VARIABLES</h3>
      <div class="code-block">name = "Alex"
age = 21
is_hacker = True
score = 9.5
print(name)  # Output: Alex</div>
      <h3>// IF STATEMENTS</h3>
      <div class="code-block">age = 18
if age >= 18:
    print("You can vote")
else:
    print("Too young")</div>
      <h3>// LOOPS</h3>
      <div class="code-block">for i in range(5):
    print(i)

count = 0
while count < 3:
    print("counting:", count)
    count += 1</div>
      <h3>// FUNCTIONS</h3>
      <div class="code-block">def greet(name):
    return "Hello, " + name + "!"

result = greet("Hacker")
print(result)</div>
      <div class="tip-box">Practice Python for free at replit.com or python.org — no installation needed!</div>
      <div class="quiz-section">
        <div class="quiz-title">// QUICK QUIZ</div>
        <div class="quiz-q">What will print("5" + "3") output in Python?</div>
        <div class="quiz-opts">
          <button class="quiz-opt" onclick="checkAnswer(this, false)">8</button>
          <button class="quiz-opt" onclick="checkAnswer(this, true)">53</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">Error</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">5+3</button>
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>`
  },
  'network-security': {
    cat:'cyber', title:'How Networks Work', level:'beginner',
    icon:'🌐', desc:'Understanding networks is key to cybersecurity',
    content: `
      <h3>// WHAT IS A NETWORK?</h3>
      <p>A network is two or more computers connected together to share data. The internet is the largest network — billions of devices all connected.</p>
      <h3>// IP ADDRESSES</h3>
      <ul>
        <li><strong>IPv4</strong> — 4 numbers (192.168.0.1) — Most common</li>
        <li><strong>IPv6</strong> — New format (2001:db8::1)</li>
        <li><strong>Public IP</strong> — Visible to the internet</li>
        <li><strong>Private IP</strong> — Only inside your home network</li>
      </ul>
      <h3>// PORTS</h3>
      <div class="code-block">Port 80   → HTTP (websites)
Port 443  → HTTPS (secure websites)
Port 22   → SSH (remote access)
Port 21   → FTP (file transfer)
Port 3306 → MySQL (database)</div>
      <h3>// THE OSI MODEL</h3>
      <ul>
        <li>7 — Application (what you see)</li>
        <li>6 — Presentation (encryption)</li>
        <li>5 — Session (connections)</li>
        <li>4 — Transport (TCP/UDP)</li>
        <li>3 — Network (IP addresses)</li>
        <li>2 — Data Link (MAC addresses)</li>
        <li>1 — Physical (cables/wifi)</li>
      </ul>
      <div class="tip-box">Remember: "All People Seem To Need Data Processing" for the 7 layers!</div>
      <div class="quiz-section">
        <div class="quiz-title">// QUICK QUIZ</div>
        <div class="quiz-q">Which port does HTTPS use?</div>
        <div class="quiz-opts">
          <button class="quiz-opt" onclick="checkAnswer(this, false)">80</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">22</button>
          <button class="quiz-opt" onclick="checkAnswer(this, true)">443</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">21</button>
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>`
  },
  'linux-basics': {
    cat:'hacking', title:'Linux for Hackers', level:'beginner',
    icon:'🐧', desc:'Master the essential Linux commands',
    content: `
      <h3>// WHY LINUX?</h3>
      <p>Most hacking tools run on Linux. Kali Linux is the most popular OS for ethical hackers — it comes pre-loaded with 600+ hacking tools.</p>
      <h3>// ESSENTIAL COMMANDS</h3>
      <div class="code-block">ls          # List files
cd /home    # Change directory
pwd         # Print current path
mkdir hack  # Create folder
cat file.txt  # Read a file
nano file.txt # Edit a file
chmod +x file # Make executable
sudo        # Run as admin</div>
      <h3>// NETWORKING COMMANDS</h3>
      <div class="code-block">ifconfig    # Show network interfaces
ping 8.8.8.8  # Test connectivity
netstat -an   # Show open connections
nmap -sV 192.168.1.1  # Scan ports
traceroute google.com  # Trace route</div>
      <h3>// FILE SYSTEM</h3>
      <ul>
        <li><code>/</code> — Root directory</li>
        <li><code>/home</code> — User files</li>
        <li><code>/etc</code> — Config files</li>
        <li><code>/var/log</code> — System logs</li>
        <li><code>/tmp</code> — Temporary files</li>
      </ul>
      <div class="tip-box">Practice Linux free at TryHackMe.com — browser-based Linux machine!</div>
      <div class="quiz-section">
        <div class="quiz-title">// QUICK QUIZ</div>
        <div class="quiz-q">Which command lists files in a directory?</div>
        <div class="quiz-opts">
          <button class="quiz-opt" onclick="checkAnswer(this, false)">cd</button>
          <button class="quiz-opt" onclick="checkAnswer(this, true)">ls</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">pwd</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">mkdir</button>
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>`
  },
  'youtube-growth': {
    cat:'content', title:'YouTube Growth Secrets', level:'beginner',
    icon:'🎬', desc:'Grow your YouTube channel fast',
    content: `
      <h3>// THE YOUTUBE ALGORITHM</h3>
      <p>YouTube recommends videos based on Click-Through Rate (CTR) and watch time. You need people to click AND watch to the end.</p>
      <h3>// THUMBNAIL & TITLE FORMULA</h3>
      <ul>
        <li>Use big, bold text (3-5 words max)</li>
        <li>Show a face with strong emotion</li>
        <li>Create curiosity gaps — "I tried this for 30 days..."</li>
        <li>Use numbers: "7 Hacks That Changed My Life"</li>
        <li>Promise a result: "Learn Python in 1 Hour"</li>
      </ul>
      <h3>// FIRST 48 HOURS</h3>
      <p>YouTube tests your video to a small audience first. If they click and watch, it gets pushed to more people. The first 48 hours are CRITICAL.</p>
      <div class="tip-box">Post Tuesday-Thursday between 2PM-4PM local time for best results on tech content.</div>
      <h3>// RETENTION HACKS</h3>
      <ul>
        <li>Hook in the first 15 seconds</li>
        <li>Cut all pauses and "umms" in editing</li>
        <li>Use B-roll footage to keep visuals interesting</li>
        <li>Add text overlays for key points</li>
        <li>End with a cliffhanger</li>
      </ul>
      <div class="quiz-section">
        <div class="quiz-title">// QUICK QUIZ</div>
        <div class="quiz-q">What does YouTube's algorithm primarily value?</div>
        <div class="quiz-opts">
          <button class="quiz-opt" onclick="checkAnswer(this, false)">Number of subscribers</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">Video length</button>
          <button class="quiz-opt" onclick="checkAnswer(this, true)">CTR and Watch Time</button>
          <button class="quiz-opt" onclick="checkAnswer(this, false)">Upload frequency</button>
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>`
  }
};

const TOPICS_DATA = {
  cyber: [
    {id:'network-security', icon:'🌐', name:'How Networks Work', desc:'IP, ports, OSI model basics', level:'beginner'},
    {id:'what-is-hacking', icon:'🛡️', name:'Cyber Defense Basics', desc:'Firewalls, antivirus & more', level:'beginner'},
    {id:'', icon:'🔐', name:'Encryption & Cryptography', desc:'How data is kept secret', level:'intermediate'},
    {id:'', icon:'🦠', name:'Malware & Viruses', desc:'Types of malicious software', level:'intermediate'},
    {id:'', icon:'🎣', name:'Phishing & Social Engineering', desc:'Human hacking explained', level:'beginner'},
  ],
  hacking: [
    {id:'what-is-hacking', icon:'💻', name:'Ethical Hacking Intro', desc:'What it is and how to start', level:'beginner'},
    {id:'linux-basics', icon:'🐧', name:'Linux for Hackers', desc:'Essential Linux commands', level:'beginner'},
    {id:'', icon:'🔍', name:'Reconnaissance', desc:'OSINT and info gathering', level:'intermediate'},
    {id:'', icon:'🚪', name:'Port Scanning with Nmap', desc:'Discover open services', level:'intermediate'},
    {id:'', icon:'💉', name:'SQL Injection Basics', desc:'Most common web attack', level:'intermediate'},
  ],
  coding: [
    {id:'python-basics', icon:'🐍', name:'Python in 10 Minutes', desc:'Quick Python starter guide', level:'beginner'},
    {id:'', icon:'🌐', name:'HTML & CSS Basics', desc:'Build your first webpage', level:'beginner'},
    {id:'', icon:'⚡', name:'JavaScript Essentials', desc:'Make websites interactive', level:'beginner'},
    {id:'', icon:'🔧', name:'Bash Scripting', desc:'Automate with shell scripts', level:'intermediate'},
    {id:'', icon:'🤖', name:'Python for Hacking', desc:'Build your own tools', level:'advanced'},
  ],
  content: [
    {id:'youtube-growth', icon:'🎬', name:'YouTube Growth Secrets', desc:'Grow your channel fast', level:'beginner'},
    {id:'', icon:'📱', name:'TikTok Strategy 2025', desc:'Short-form content that works', level:'beginner'},
    {id:'', icon:'✍️', name:'Writing Viral Titles', desc:'Copywriting for creators', level:'beginner'},
    {id:'', icon:'🎙️', name:'Podcasting 101', desc:'Start your audio show', level:'beginner'},
    {id:'', icon:'💰', name:'Monetize Your Content', desc:'Make money creating', level:'intermediate'},
  ]
};

function renderTopics(cat) {
  const topics = TOPICS_DATA[cat] || [];
  const list = document.getElementById('topic-list');
  list.innerHTML = topics.map(t => `
    <div class="topic-item" onclick="${t.id ? `openLesson('${t.id}')` : "showToast('Coming soon! 🚀')"}">
      <div class="topic-icon">${t.icon}</div>
      <div class="topic-info">
        <div class="topic-name">${t.name}</div>
        <div class="topic-desc">${t.desc}</div>
        <span class="topic-badge badge-${t.level}">${t.level}</span>
      </div>
      <div class="topic-arrow">${t.id ? '›' : '🔒'}</div>
    </div>
  `).join('');
}

// ===== LESSON VIEW =====
function openLesson(id) {
  const lesson = LESSONS[id];
  if(!lesson) { showToast('Coming soon! 🚀'); return; }
  document.getElementById('lesson-title-header').textContent = lesson.title;
  document.getElementById('lesson-cat-header').textContent = lesson.cat.toUpperCase() + ' · ' + lesson.level.toUpperCase();
  document.getElementById('lesson-content-area').innerHTML = lesson.content;
  document.getElementById('lesson-view').classList.add('open');
  document.body.style.overflow = 'hidden';
  if(!state.lessons.includes(id)) {
    state.lessons.push(id);
    state.xp += 50;
    saveState();
    updateUI();
    setTimeout(() => showToast('🎉 +50 XP earned!'), 500);
  }
}

function closeLesson() {
  document.getElementById('lesson-view').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== QUIZ =====
function checkAnswer(btn, correct) {
  const opts = btn.parentElement.querySelectorAll('.quiz-opt');
  opts.forEach(o => o.disabled = true);
  const result = document.getElementById('quiz-result');
  if(correct) {
    btn.classList.add('correct');
    result.style.color = 'var(--accent)';
    result.textContent = '✅ Correct! Great job!';
    state.xp += 25;
    state.quizzes += 1;
    saveState();
    updateUI();
    setTimeout(() => showToast('🧠 +25 XP for correct answer!'), 300);
  } else {
    btn.classList.add('wrong');
    opts.forEach(o => { if(o.onclick.toString().includes('true')) o.classList.add('correct'); });
    result.style.color = 'var(--accent3)';
    result.textContent = '❌ Not quite — see the correct answer above';
  }
  result.style.display = 'block';
}

// ===== AI TUTOR =====
let chatHistory = [];
const chatArea = document.getElementById('chat-area');

function addMsg(text, role) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  if(role === 'ai') {
    div.innerHTML = `<div class="msg-label">// AI TUTOR</div>${text}`;
  } else {
    div.textContent = text;
  }
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
  return div;
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if(!msg) return;
  input.value = '';
  input.style.height = 'auto';
  addMsg(msg, 'user');
  chatHistory.push({role:'user', content: msg});
  const typing = document.getElementById('typing');
  typing.style.display = 'block';
  chatArea.scrollTop = chatArea.scrollHeight;
  document.getElementById('send-btn').disabled = true;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system:`You are an expert AI tutor for a mobile learning app called LearnHub. You teach cybersecurity, ethical hacking, coding (Python, JavaScript, bash), and content creation. Keep answers clear, practical, and beginner-friendly. Use emojis sparingly. Format with short paragraphs. Use • for bullet points. Always encourage the learner. Keep responses under 300 words unless asked for more.`,
        messages: chatHistory
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Try again!";
    typing.style.display = 'none';
    chatHistory.push({role:'assistant', content:reply});
    addMsg(reply, 'ai');
  } catch(e) {
    typing.style.display = 'none';
    addMsg("⚠️ Connection issue. Check your internet and try again!", 'ai');
  }
  document.getElementById('send-btn').disabled = false;
  chatArea.scrollTop = chatArea.scrollHeight;
}

function sendChip(chip) {
  document.getElementById('chat-input').value = chip.textContent;
  sendMessage();
}

function handleKey(e) {
  if(e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

document.getElementById('chat-input').addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 100) + 'px';
});

// ===== MODAL CONTENT =====
const MODAL_CONTENT = {
  kali: {
    title:'🐉 KALI LINUX GUIDE',
    body:`<p style="color:var(--text2);font-size:0.9rem;margin-bottom:16px">Kali Linux is the go-to OS for ethical hackers:</p>
      <div class="code-block">1. Download: kali.org/get-kali
2. Install VirtualBox (free)
3. Import Kali as Virtual Machine
4. Default login: kali / kali</div>
      <p style="color:var(--text);font-size:0.9rem;margin:14px 0 8px"><strong>Top Pre-installed Tools:</strong></p>
      <div class="code-block">nmap      - Port scanner
metasploit - Exploitation framework
wireshark  - Packet analyzer
burpsuite  - Web app testing
john       - Password cracker
aircrack   - WiFi testing</div>`
  },
  cheatsheet: {
    title:'📋 HACKING CHEATSHEET',
    body:`<div class="code-block"># NMAP SCANNING
nmap -sV 192.168.1.1    # Version scan
nmap -A 192.168.1.0/24  # Aggressive scan
nmap -p 1-1000 TARGET   # Port range

# NETWORKING
ifconfig / ip addr       # Show IPs
netstat -tuln            # Open ports
ping -c 4 google.com     # Ping test

# FILE OPERATIONS
find / -name "*.txt"     # Find files
grep -r "password" /etc  # Search text
cat /etc/passwd          # User list

# PYTHON ONE-LINERS
python3 -m http.server 8080
python3 -c "import pty;pty.spawn('/bin/bash')"</div>`
  },
  roadmap: {
    title:'🗺️ LEARNING ROADMAP',
    body:`<div style="display:flex;flex-direction:column;gap:10px">
      ${['🟢 Phase 1: Foundations (1-2 months)\n→ Linux basics\n→ Networking fundamentals\n→ Python scripting basics',
         '🟡 Phase 2: Core Skills (2-3 months)\n→ Complete TryHackMe beginner path\n→ Learn OWASP Top 10\n→ Practice on HackTheBox',
         '🔵 Phase 3: Specialization (3+ months)\n→ Choose: Web, Network, or Mobile\n→ Study for CEH or CompTIA Security+\n→ Build a home lab',
         '🔴 Phase 4: Real Work\n→ Bug bounty hunting (HackerOne)\n→ CTF competitions\n→ Build your portfolio'].map(p => `
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:12px;font-family:var(--font-mono);font-size:0.72rem;color:var(--text);white-space:pre-line">${p}</div>`).join('')}
    </div>`
  },
  resources: {
    title:'🔗 FREE RESOURCES',
    body:`<div style="display:flex;flex-direction:column;gap:10px">
      ${[['🎯','TryHackMe','tryhackme.com','Best beginner-friendly hacking labs'],
         ['⚔️','HackTheBox','hackthebox.com','Real-world hacking challenges'],
         ['🐍','Python.org','docs.python.org','Official Python tutorials'],
         ['📹','NetworkChuck','YouTube','Amazing free hacking/networking videos'],
         ['🏆','CTFtime','ctftime.org','Find hacking competitions'],
         ['📚','OWASP','owasp.org','Web security bible - free']].map(([icon,name,url,desc]) => `
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;gap:12px;align-items:center">
          <span style="font-size:1.5rem">${icon}</span>
          <div>
            <div style="font-weight:700;color:var(--text);font-size:0.88rem">${name}</div>
            <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--accent);margin:2px 0">${url}</div>
            <div style="font-size:0.78rem;color:var(--text2)">${desc}</div>
          </div>
        </div>`).join('')}
    </div>`
  },
  glossary: {
    title:'📖 TECH GLOSSARY',
    body:`<div style="display:flex;flex-direction:column;gap:8px">
      ${[['CVE','Common Vulnerabilities and Exposures — official vulnerability database'],
         ['DDoS','Distributed Denial of Service — flood attack to crash servers'],
         ['DNS','Domain Name System — translates domain names to IPs'],
         ['Exploit','Code that takes advantage of a security vulnerability'],
         ['Firewall','Network security that filters incoming/outgoing traffic'],
         ['Hash','One-way encryption — like a fingerprint for data'],
         ['IOC','Indicator of Compromise — evidence of a hack'],
         ['Payload','Malicious code delivered through an exploit'],
         ['Pentest','Penetration Test — authorized simulated attack'],
         ['SIEM','Security Info & Event Management tool'],
         ['VPN','Virtual Private Network — encrypts your connection'],
         ['Zero-Day','Unknown vulnerability with no patch yet']].map(([term,def]) => `
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:12px">
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent);margin-bottom:3px">${term}</div>
          <div style="font-size:0.83rem;color:var(--text)">${def}</div>
        </div>`).join('')}
    </div>`
  }
};

function openModal(key) {
  const m = MODAL_CONTENT[key];
  if(!m) return;
  document.getElementById('modal-title').textContent = m.title;
  document.getElementById('modal-body').innerHTML = m.body;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
    background:var(--bg2);border:1px solid var(--accent);
    color:var(--text);padding:10px 20px;border-radius:20px;
    font-family:var(--font-body);font-size:0.85rem;
    z-index:999;animation:fadeIn 0.3s ease;
    white-space:nowrap;box-shadow:0 4px 20px rgba(0,245,196,0.2);
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ===== PWA MANIFEST =====
const manifestData = {
  name: "LearnHub - Learn Cybersecurity & Coding",
  short_name: "LearnHub",
  description: "Learn cybersecurity, ethical hacking, coding, and content creation",
  start_url: "./",
  display: "standalone",
  background_color: "#0a0a0f",
  theme_color: "#00f5c4",
  icons: [{
    src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230a0a0f'/><text y='70' x='10' font-size='65'>🛡️</text></svg>",
    sizes: "192x192", type: "image/svg+xml"
  }]
};
const blob = new Blob([JSON.stringify(manifestData)], {type:'application/json'});
const manifestURL = URL.createObjectURL(blob);
const link = document.createElement('link');
link.rel = 'manifest'; link.href = manifestURL;
document.head.appendChild(link);

// ===== SERVICE WORKER =====
if('serviceWorker' in navigator) {
  const sw = `
    const CACHE = 'learnhub-v1';
    self.addEventListener('install', e => {
      e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/'])));
      self.skipWaiting();
    });
    self.addEventListener('fetch', e => {
      e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => new Response('Offline'))));
    });
  `;
  const swBlob = new Blob([sw], {type:'text/javascript'});
  const swURL = URL.createObjectURL(swBlob);
  navigator.serviceWorker.register(swURL).catch(()=>{});
}
