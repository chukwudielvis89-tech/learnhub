// ===== STATE =====
let state = JSON.parse(localStorage.getItem('learnhub') || '{}');
if(!state.xp) state.xp = 0;
if(!state.lessons) state.lessons = [];
if(!state.quizzes) state.quizzes = 0;
if(!state.streak) state.streak = 1;

function saveState() { localStorage.setItem('learnhub', JSON.stringify(state)); }

function getLevel(xp) {
  if(xp < 100) return {level:1, title:'Newbie', next:100};
  if(xp < 250) return {level:2, title:'Script Kiddie', next:250};
  if(xp < 500) return {level:3, title:'Coder', next:500};
  if(xp < 1000) return {level:4, title:'Hacker', next:1000};
  if(xp < 2000) return {level:5, title:'Pro Hacker', next:2000};
  if(xp < 3500) return {level:6, title:'Elite', next:3500};
  return {level:7, title:'Cyber Ninja', next:5000};
}

setTimeout(() => { document.getElementById('splash').classList.add('hide'); updateUI(); }, 2000);

function updateUI() {
  const lvl = getLevel(state.xp);
  document.getElementById('xp-display').textContent = `⚡ ${state.xp} XP`;
  const ld = document.getElementById('level-display');
  if(ld) ld.textContent = `LVL ${lvl.level} · ${lvl.title}`;
  const sn = document.getElementById('streak-num');
  if(sn) sn.textContent = state.streak;
  ['stat-lessons','stat-xp','stat-streak2','stat-quizzes'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = id==='stat-lessons'?state.lessons.length:id==='stat-xp'?state.xp:id==='stat-streak2'?state.streak:state.quizzes;
  });
  const done={cyber:0,hacking:0,coding:0,content:0};
  state.lessons.forEach(l=>{const ls=LESSONS[l];if(ls)done[ls.cat]=(done[ls.cat]||0)+1;});
  [['cyber','cyber',12],['hack','hacking',10],['code','coding',15],['content','content',8]].forEach(([id,cat,total])=>{
    const pct=Math.round((done[cat]||0)/total*100);
    const b=document.getElementById(`pb-${id}`);const lb=document.getElementById(`pb-${id}-label`);
    if(b)b.style.width=pct+'%';if(lb)lb.textContent=pct+'%';
  });
  if(state.lessons.length>=1)document.getElementById('ach-first')?.classList.remove('locked');
  if(state.lessons.length>=5)document.getElementById('ach-hacker')?.classList.remove('locked');
  if(state.quizzes>=3)document.getElementById('ach-quiz')?.classList.remove('locked');
  if(state.streak>=7)document.getElementById('ach-streak')?.classList.remove('locked');
  if(state.xp>=500)document.getElementById('ach-xp')?.classList.remove('locked');
  if(state.lessons.length>=10)document.getElementById('ach-ten')?.classList.remove('locked');
}

function switchPage(name, btn) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  btn.classList.add('active');
}

function goToLearn(cat) {
  const titles={cyber:'🛡️ Cybersecurity',hacking:'💻 Ethical Hacking',coding:'⚙️ Coding',content:'🎬 Content Creation'};
  document.getElementById('learn-title').textContent=titles[cat]||'All Topics';
  document.getElementById('learn-sub').textContent='Select a lesson to begin';
  renderTopics(cat);
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-learn').classList.add('active');
  document.querySelectorAll('.nav-btn')[1].classList.add('active');
}

const LESSON_ORDER=['what-is-hacking','linux-basics','reconnaissance','nmap-basics','sql-injection','network-security','encryption','phishing','malware','firewalls','python-basics','python-loops','python-functions','javascript-basics','html-css-basics','youtube-growth','tiktok-strategy','viral-titles','podcasting','monetize'];

const LESSONS = {
'what-is-hacking':{cat:'hacking',title:'What is Ethical Hacking?',level:'beginner',icon:'💻',desc:'Learn the basics of ethical hacking',
sections:[
{title:'WHAT IS ETHICAL HACKING?',body:'<p>Ethical hacking is the practice of probing systems to find vulnerabilities — but with <strong>permission</strong>.</p><div class="tip-box">Ethical hackers do the same as malicious hackers, but they report findings to help fix vulnerabilities.</div>'},
{title:'WHY IT MATTERS',body:'<p>Google, Facebook, governments — all hire ethical hackers. Average salary: <strong>$95,000-$150,000/year!</strong></p>'},
{title:'TYPES OF HACKERS',body:'<ul><li><strong>White Hat</strong> — Ethical, legal ✅</li><li><strong>Black Hat</strong> — Malicious, illegal ❌</li><li><strong>Grey Hat</strong> — In between</li></ul><div class="warn-box">Always get written permission before testing any system!</div>'},
{title:'THE 5 PHASES',body:'<ul><li>1️⃣ <strong>Reconnaissance</strong> — Gather info</li><li>2️⃣ <strong>Scanning</strong> — Find open ports</li><li>3️⃣ <strong>Gaining Access</strong> — Exploit vulns</li><li>4️⃣ <strong>Maintaining Access</strong> — Stay in system</li><li>5️⃣ <strong>Covering Tracks</strong> — Remove evidence</li></ul>'}
],
quizzes:[
{q:'What makes ethical hacking legal?',opts:['Special software','Written permission','Only hacking governments','Not stealing data'],ans:1},
{q:'Which hacker type is in between white and black hat?',opts:['Script Kiddie','Red Hat','Grey Hat','Blue Hat'],ans:2},
{q:'What is the FIRST phase of hacking?',opts:['Scanning','Gaining Access','Reconnaissance','Covering Tracks'],ans:2},
{q:'What is the average ethical hacker salary?',opts:['$20,000','$50,000','$95,000-$150,000','$200,000+'],ans:2}
]},

'linux-basics':{cat:'hacking',title:'Linux for Hackers',level:'beginner',icon:'🐧',desc:'Master essential Linux commands',
sections:[
{title:'WHY LINUX?',body:'<p>Kali Linux comes pre-loaded with 600+ hacking tools and is the #1 OS for ethical hackers. It\'s free and open source!</p>'},
{title:'ESSENTIAL COMMANDS',body:'<div class="code-block">ls          # List files\ncd /home    # Change directory\npwd         # Print current path\nmkdir hack  # Create folder\ncat file.txt  # Read file\nnano file.txt # Edit file\nchmod +x file # Make executable\nsudo        # Run as admin</div>'},
{title:'NETWORKING COMMANDS',body:'<div class="code-block">ifconfig         # Show network\nping 8.8.8.8     # Test connection\nnetstat -an      # Open connections\nnmap -sV TARGET  # Scan ports\ntraceroute google.com  # Trace route</div>'},
{title:'FILE SYSTEM',body:'<ul><li><code>/</code> — Root (top level)</li><li><code>/home</code> — User files</li><li><code>/etc</code> — Config files</li><li><code>/var/log</code> — Log files</li><li><code>/tmp</code> — Temp files</li></ul><div class="tip-box">Practice free at TryHackMe.com!</div>'}
],
quizzes:[
{q:'Which command lists files?',opts:['cd','pwd','ls','mkdir'],ans:2},
{q:'What does "sudo" do?',opts:['Delete files','Run as admin','List files','Create folder'],ans:1},
{q:'Which folder has config files?',opts:['/home','/tmp','/etc','/root'],ans:2},
{q:'What shows your IP address?',opts:['ping','ifconfig','ls','pwd'],ans:1}
]},

'reconnaissance':{cat:'hacking',title:'Reconnaissance & OSINT',level:'intermediate',icon:'🔍',desc:'Information gathering techniques',
sections:[
{title:'WHAT IS RECON?',body:'<p>Reconnaissance is gathering info about a target before attacking. Two types:</p><ul><li><strong>Passive</strong> — Public info, no target contact</li><li><strong>Active</strong> — Directly interacting with target</li></ul>'},
{title:'OSINT TOOLS',body:'<ul><li>🔍 <strong>Google Dorking</strong> — Advanced searches</li><li>👤 <strong>Social Media</strong> — LinkedIn, Facebook</li><li>🌐 <strong>WHOIS</strong> — Who owns a domain</li><li>🗺️ <strong>Shodan</strong> — Search connected devices</li></ul>'},
{title:'GOOGLE DORKING',body:'<div class="code-block">site:example.com          # Search one site\nfiletype:pdf example.com  # Find PDFs\nintitle:"index of"        # Open directories\ninurl:admin               # Find admin pages</div><div class="warn-box">Only use on systems you have permission to test!</div>'},
{title:'RECON TOOLS',body:'<ul><li><strong>Maltego</strong> — Visual link analysis</li><li><strong>theHarvester</strong> — Email gathering</li><li><strong>Shodan</strong> — Device search engine</li><li><strong>Recon-ng</strong> — Recon framework</li></ul><div class="tip-box">Shodan.io is like Google for internet-connected devices!</div>'}
],
quizzes:[
{q:'What is passive recon?',opts:['Scanning systems','Public info without touching target','Breaking into systems','Deleting logs'],ans:1},
{q:'What does OSINT stand for?',opts:['Online Security Intel','Open Source Intelligence','Offensive Security','Operating System Interface'],ans:1},
{q:'What is Google Dorking?',opts:['Hacking Google','Advanced search operators','Creating fake pages','Stealing data'],ans:1},
{q:'Which tool searches internet-connected devices?',opts:['Maltego','Recon-ng','Shodan','theHarvester'],ans:2}
]},

'nmap-basics':{cat:'hacking',title:'Port Scanning with Nmap',level:'intermediate',icon:'🚪',desc:'Discover open ports and services',
sections:[
{title:'WHAT IS NMAP?',body:'<p>Nmap (Network Mapper) is the most popular port scanner. It finds open ports and running services on a target.</p><div class="tip-box">Nmap is pre-installed on Kali Linux and is completely free!</div>'},
{title:'BASIC COMMANDS',body:'<div class="code-block">nmap 192.168.1.1         # Basic scan\nnmap -p 80,443 TARGET   # Specific ports\nnmap -p- TARGET         # All 65535 ports\nnmap 192.168.1.0/24     # Whole network</div>'},
{title:'ADVANCED SCANS',body:'<div class="code-block">nmap -sV TARGET  # Version detection\nnmap -O TARGET   # OS detection\nnmap -A TARGET   # Aggressive (all)\nnmap -sS TARGET  # Stealth scan\nnmap -oN out.txt # Save to file</div>'},
{title:'UNDERSTANDING RESULTS',body:'<ul><li>🟢 <strong>Open</strong> — Accepting connections</li><li>🔴 <strong>Closed</strong> — Accessible, no service</li><li>🟡 <strong>Filtered</strong> — Firewall blocking</li></ul><div class="warn-box">Only scan networks you have permission to test!</div>'}
],
quizzes:[
{q:'What does Nmap stand for?',opts:['Network Mapper','Normal Map','Network Manager','Net Monitor'],ans:0},
{q:'Which flag detects software versions?',opts:['-O','-sS','-sV','-A'],ans:2},
{q:'What does a "filtered" port mean?',opts:['Port is open','No service running','Firewall blocking it','Port gone'],ans:2},
{q:'Which scan is hardest to detect?',opts:['Basic scan','-A aggressive','-sS stealth','-sV version'],ans:2}
]},

'sql-injection':{cat:'hacking',title:'SQL Injection Basics',level:'intermediate',icon:'💉',desc:'Most common web attack explained',
sections:[
{title:'WHAT IS SQL INJECTION?',body:'<p>SQL Injection is the #1 most common web attack. It tricks a database by injecting malicious SQL code through user input fields.</p><p>It\'s always in the OWASP Top 10 most critical security risks!</p>'},
{title:'HOW IT WORKS',body:'<div class="code-block"># Normal login:\nSELECT * FROM users WHERE username=\'admin\' AND password=\'1234\'\n\n# With SQL injection:\nUsername: admin\'--\n# Becomes:\nSELECT * FROM users WHERE username=\'admin\'--\n# -- comments out the password check!</div>'},
{title:'PREVENTION',body:'<ul><li>✅ <strong>Prepared statements</strong></li><li>✅ <strong>Input validation</strong></li><li>✅ <strong>Stored procedures</strong></li><li>✅ <strong>Least privilege</strong> DB access</li></ul><div class="warn-box">Only test SQL injection on systems you own or have permission!</div>'},
{title:'PRACTICE SAFELY',body:'<p>Practice on these legal platforms:</p><ul><li>🎯 DVWA (Damn Vulnerable Web App)</li><li>⚔️ HackTheBox.com</li><li>🏆 TryHackMe.com</li><li>🌐 PortSwigger Web Academy (free!)</li></ul><div class="tip-box">PortSwigger Academy has free SQL injection labs that teach you hands-on!</div>'}
],
quizzes:[
{q:'SQL Injection is in which list?',opts:['NMAP Top 10','OWASP Top 10','FBI Top 10','Google Top 10'],ans:1},
{q:'What does -- do in SQL?',opts:['Comments out the rest','Deletes database','Creates user','Logs out'],ans:0},
{q:'Best way to prevent SQL injection?',opts:['Strong passwords','Prepared statements','Antivirus','VPN'],ans:1},
{q:'Which SQLi shows no visible output?',opts:['In-band','Error-based','Blind SQLi','Out-of-band'],ans:2}
]},

'network-security':{cat:'cyber',title:'How Networks Work',level:'beginner',icon:'🌐',desc:'Networking fundamentals for security',
sections:[
{title:'WHAT IS A NETWORK?',body:'<p>A network is computers connected to share data. The internet is billions of devices connected. Every message, video, and website travels across networks!</p>'},
{title:'IP ADDRESSES & PORTS',body:'<ul><li><strong>IPv4</strong> — 192.168.0.1 (most common)</li><li><strong>Public IP</strong> — Your internet address</li><li><strong>Private IP</strong> — Inside your home network</li></ul><div class="code-block">Port 80  → HTTP\nPort 443 → HTTPS\nPort 22  → SSH\nPort 21  → FTP\nPort 25  → Email (SMTP)</div>'},
{title:'TCP vs UDP',body:'<ul><li><strong>TCP</strong> — Reliable, confirms delivery. Used for web, email</li><li><strong>UDP</strong> — Fast, no confirmation. Used for gaming, video calls</li></ul><div class="tip-box">TCP = registered letter (confirmed). UDP = shouting across a room (fast, no guarantee)!</div>'},
{title:'THE OSI MODEL',body:'<ul><li>7 — Application (browsers, apps)</li><li>6 — Presentation (encryption)</li><li>5 — Session (connections)</li><li>4 — Transport (TCP/UDP)</li><li>3 — Network (IP routing)</li><li>2 — Data Link (MAC)</li><li>1 — Physical (cables/wifi)</li></ul><div class="tip-box">Remember: "All People Seem To Need Data Processing"!</div>'}
],
quizzes:[
{q:'Which port does HTTPS use?',opts:['80','22','443','21'],ans:2},
{q:'What is TCP best described as?',opts:['Fast but unreliable','Reliable with confirmation','Only for gaming','Wireless only'],ans:1},
{q:'How many OSI layers are there?',opts:['4','5','6','7'],ans:3},
{q:'What does Private IP mean?',opts:['Visible on internet','Only inside your network','Government owned','For hacking'],ans:1}
]},

'encryption':{cat:'cyber',title:'Encryption & Cryptography',level:'intermediate',icon:'🔐',desc:'How data is kept secret',
sections:[
{title:'WHAT IS ENCRYPTION?',body:'<p>Encryption converts readable data (plaintext) into unreadable format (ciphertext). Only authorized people with the key can decrypt it.</p><div class="tip-box">Every 🔒 in your browser means your data is encrypted with HTTPS!</div>'},
{title:'SYMMETRIC vs ASYMMETRIC',body:'<ul><li><strong>Symmetric</strong> — Same key for encrypt & decrypt. Fast. Example: AES</li><li><strong>Asymmetric</strong> — Public key encrypts, Private key decrypts. Safer. Example: RSA</li></ul><div class="code-block">Symmetric:   🔑 → encrypt → 🔑 → decrypt\nAsymmetric:  🔓public → encrypt → 🔑private → decrypt</div>'},
{title:'HASHING',body:'<p>Hashing is ONE WAY — you can\'t reverse it. Used for passwords!</p><div class="code-block">password123 → SHA256 → ef92b778bafe771...</div><ul><li><strong>MD5</strong> — Old, insecure</li><li><strong>SHA-256</strong> — Current standard</li><li><strong>bcrypt</strong> — Best for passwords</li></ul>'},
{title:'REAL WORLD',body:'<ul><li>🌐 HTTPS/TLS — Secures websites</li><li>💬 End-to-end — WhatsApp, Signal</li><li>💾 Full disk — Protects stolen phones</li><li>🔑 VPN — Encrypts your connection</li></ul><div class="warn-box">Encryption is not unbreakable — weak keys or implementation can compromise it!</div>'}
],
quizzes:[
{q:'What is the difference between encryption and hashing?',opts:['Same thing','Encryption reversible, hashing not','Hashing reversible, encryption not','Neither reversible'],ans:1},
{q:'Which uses same key to encrypt AND decrypt?',opts:['Asymmetric','RSA','Symmetric','PGP'],ans:2},
{q:'Which is best for passwords?',opts:['MD5','SHA-1','SHA-256','bcrypt'],ans:3},
{q:'What does HTTPS use?',opts:['VPN','TLS encryption','Firewall','Antivirus'],ans:1}
]},

'phishing':{cat:'cyber',title:'Phishing & Social Engineering',level:'beginner',icon:'🎣',desc:'Human hacking and how to stop it',
sections:[
{title:'WHAT IS SOCIAL ENGINEERING?',body:'<p>Social engineering manipulates people into giving up information. It exploits human psychology, not technical vulnerabilities.</p><p><strong>95% of breaches involve human error!</strong></p>'},
{title:'TYPES OF PHISHING',body:'<ul><li>📧 <strong>Email Phishing</strong> — Fake emails from banks, Google</li><li>🎯 <strong>Spear Phishing</strong> — Targeted at specific person</li><li>🐋 <strong>Whaling</strong> — Targeting CEOs/executives</li><li>📱 <strong>Smishing</strong> — Via SMS text messages</li><li>📞 <strong>Vishing</strong> — Via phone calls</li></ul>'},
{title:'HOW TO SPOT PHISHING',body:'<ul><li>🔍 Check sender email carefully (paypa1 vs paypal)</li><li>⚠️ Urgent language — "Act in 24 hours!"</li><li>🔗 Hover over links before clicking</li><li>❌ Poor grammar and spelling</li><li>💰 Requests for money or personal info</li></ul><div class="tip-box">When in doubt, go directly to the website by typing the URL!</div>'},
{title:'PROTECTING YOURSELF',body:'<ul><li>✅ Enable 2-Factor Authentication</li><li>✅ Use a password manager</li><li>✅ Keep software updated</li><li>✅ Verify requests through different channels</li><li>✅ Be skeptical of unexpected requests</li></ul>'}
],
quizzes:[
{q:'What % of breaches involve human error?',opts:['25%','50%','75%','95%'],ans:3},
{q:'What is Whaling?',opts:['Hacking underwater','Targeting executives','Mass email phishing','SMS attacks'],ans:1},
{q:'What is Smishing?',opts:['Email phishing','Phone call phishing','SMS phishing','Clone phishing'],ans:2},
{q:'Best way to verify a suspicious email?',opts:['Reply to email','Click link to check','Contact sender via different channel','Ignore it'],ans:2}
]},

'malware':{cat:'cyber',title:'Malware & Viruses',level:'intermediate',icon:'🦠',desc:'Types of malicious software',
sections:[
{title:'WHAT IS MALWARE?',body:'<p>Malware (malicious software) is designed to harm systems or steal data. In 2024 there are over <strong>1 billion malware programs</strong> in existence!</p>'},
{title:'TYPES OF MALWARE',body:'<ul><li>🦠 <strong>Virus</strong> — Spreads by attaching to files</li><li>🐛 <strong>Worm</strong> — Self-replicates through networks</li><li>🐴 <strong>Trojan</strong> — Disguised as legitimate software</li><li>💰 <strong>Ransomware</strong> — Encrypts files, demands payment</li><li>🔍 <strong>Spyware</strong> — Secretly monitors you</li><li>⛏️ <strong>Cryptominer</strong> — Uses your CPU to mine crypto</li></ul>'},
{title:'HOW IT SPREADS',body:'<ul><li>📧 Email attachments</li><li>🌐 Malicious websites</li><li>💾 Infected USB drives</li><li>📱 Fake apps</li><li>🔓 Unpatched vulnerabilities</li></ul><div class="warn-box">Ransomware cost businesses $20 billion in 2023. Always backup your data!</div>'},
{title:'PROTECTION',body:'<ul><li>✅ Keep OS and apps updated</li><li>✅ Use reputable antivirus</li><li>✅ Don\'t click suspicious links</li><li>✅ Backup data (3-2-1 rule)</li><li>✅ Download from official sources only</li></ul><div class="tip-box">3-2-1 rule: 3 copies, 2 media types, 1 offsite backup!</div>'}
],
quizzes:[
{q:'Which malware encrypts files and demands payment?',opts:['Virus','Spyware','Ransomware','Adware'],ans:2},
{q:'Difference between virus and worm?',opts:['No difference','Worms spread automatically','Viruses more dangerous','Worms attack phones only'],ans:1},
{q:'What is the 3-2-1 backup rule?',opts:['3 backups 2 weekly 1 monthly','3 copies 2 media types 1 offsite','3 drives 2 external 1 cloud','3 daily 2 weekly 1 yearly'],ans:1},
{q:'Which malware pretends to be real software?',opts:['Virus','Worm','Adware','Trojan'],ans:3}
]},

'firewalls':{cat:'cyber',title:'Firewalls & Defense',level:'beginner',icon:'🔥',desc:'How firewalls protect networks',
sections:[
{title:'WHAT IS A FIREWALL?',body:'<p>A firewall monitors and controls network traffic based on security rules. It\'s like a security guard for your network.</p><div class="tip-box">Your home router has a built-in firewall protecting your devices!</div>'},
{title:'TYPES',body:'<ul><li>🔢 <strong>Packet Filter</strong> — Basic, checks IPs and ports</li><li>🔄 <strong>Stateful</strong> — Tracks connection states</li><li>🌐 <strong>Application Layer</strong> — Inspects content (most powerful)</li><li>☁️ <strong>Cloud Firewall</strong> — Protects cloud services</li></ul>'},
{title:'FIREWALL RULES',body:'<div class="code-block">ALLOW  incoming port 443  (HTTPS)\nALLOW  incoming port 22   (SSH)\nBLOCK  incoming port 23   (Telnet)\nBLOCK  outgoing port 6667 (IRC)\nDENY   all other traffic  (default)</div><p>The <strong>default deny</strong> principle: block everything unless explicitly allowed!</p>'},
{title:'DEFENSE IN DEPTH',body:'<ul><li>🔥 Firewall — Filter traffic</li><li>🦠 Antivirus — Detect malware</li><li>🔐 Encryption — Protect data</li><li>🔑 2FA — Strong authentication</li><li>🎓 Training — Educate users</li></ul><div class="tip-box">Security is like an onion — multiple layers! If one fails, others protect you.</div>'}
],
quizzes:[
{q:'What does a firewall do?',opts:['Speeds internet','Controls network traffic','Fixes bugs','Encrypts data'],ans:1},
{q:'What is "default deny"?',opts:['Block all traffic','Allow all traffic','Block unless explicitly allowed','Only deny hackers'],ans:2},
{q:'Most powerful firewall type?',opts:['Packet Filter','Stateful','Application Layer','Host-based'],ans:2},
{q:'What principle uses multiple security layers?',opts:['Zero Trust','Defense in Depth','Least Privilege','Need to Know'],ans:1}
]},

'python-basics':{cat:'coding',title:'Python Fundamentals',level:'beginner',icon:'🐍',desc:'Variables, lists, and dictionaries',
sections:[
{title:'WHY PYTHON?',body:'<p>Python is the #1 language for hacking, AI, and automation. Used by Instagram, YouTube, NASA, and thousands of hacking tools!</p>'},
{title:'VARIABLES & TYPES',body:'<div class="code-block">name = "Hacker"    # String\nage = 21           # Integer\nscore = 9.5        # Float\nis_pro = True      # Boolean\n\nprint(name)        # Hacker\nprint(type(age))   # int</div>'},
{title:'IF STATEMENTS',body:'<div class="code-block">age = 18\n\nif age >= 18:\n    print("Adult")\nelif age >= 16:\n    print("Almost!")\nelse:\n    print("Too young")\n\n# Operators: == != > < >= <=</div>'},
{title:'LISTS & DICTIONARIES',body:'<div class="code-block"># List\nskills = ["python", "linux", "nmap"]\nskills.append("hacking")  # add item\nprint(skills[0])          # python\n\n# Dictionary\nhacker = {\n    "name": "Neo",\n    "level": 5\n}\nprint(hacker["name"])     # Neo</div><div class="tip-box">Practice free at replit.com — no installation needed!</div>'}
],
quizzes:[
{q:'What will print("5" + "3") output?',opts:['8','53','Error','5+3'],ans:1},
{q:'What type is True or False?',opts:['String','Integer','Boolean','Float'],ans:2},
{q:'How to add item to a list?',opts:['.add()','list+item','.append()','insert()'],ans:2},
{q:'What is a dictionary in Python?',opts:['A list of words','Key-value pairs','A loop','A function'],ans:1}
]},

'python-loops':{cat:'coding',title:'Python Loops & Logic',level:'beginner',icon:'🔄',desc:'For loops, while loops, and control flow',
sections:[
{title:'FOR LOOPS',body:'<div class="code-block">for i in range(5):\n    print(i)  # 0,1,2,3,4\n\nfruits = ["apple", "mango"]\nfor fruit in fruits:\n    print(fruit)\n\nfor i, fruit in enumerate(fruits):\n    print(i, fruit)  # 0 apple...</div>'},
{title:'WHILE LOOPS',body:'<div class="code-block">count = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# Password example\npw = ""\nwhile pw != "hacker123":\n    pw = input("Password: ")\nprint("Access granted!")</div>'},
{title:'BREAK & CONTINUE',body:'<div class="code-block"># break - exit loop early\nfor i in range(10):\n    if i == 5:\n        break\n    print(i)  # 0,1,2,3,4\n\n# continue - skip iteration\nfor i in range(10):\n    if i % 2 == 0:\n        continue  # skip even\n    print(i)  # 1,3,5,7,9</div>'},
{title:'REAL EXAMPLE',body:'<div class="code-block"># Port scanner simulation\nports = [21, 22, 80, 443]\nopen_ports = []\n\nfor port in ports:\n    if port in [80, 443]:\n        open_ports.append(port)\n        print(f"Port {port}: OPEN")\n    else:\n        print(f"Port {port}: closed")\n\nprint("Open:", open_ports)</div><div class="tip-box">This is how real port scanners work — loop through ports and check each one!</div>'}
],
quizzes:[
{q:'What does range(5) produce?',opts:['1,2,3,4,5','0,1,2,3,4','0,1,2,3,4,5','1,2,3,4'],ans:1},
{q:'What does "break" do?',opts:['Skips iteration','Exits loop completely','Pauses loop','Restarts loop'],ans:1},
{q:'What does "continue" do?',opts:['Exits loop','Pauses','Skips current iteration','Breaks program'],ans:2},
{q:'Best loop when you dont know how many iterations?',opts:['for loop','while loop','Both same','Neither'],ans:1}
]},

'python-functions':{cat:'coding',title:'Python Functions & Modules',level:'beginner',icon:'⚙️',desc:'Write reusable code',
sections:[
{title:'WHAT ARE FUNCTIONS?',body:'<p>Functions are reusable blocks of code. Write once, use many times!</p><div class="code-block">def greet(name):\n    return "Hello, " + name + "!"\n\nprint(greet("Hacker"))  # Hello, Hacker!\nprint(greet("Neo"))     # Hello, Neo!</div>'},
{title:'PARAMETERS & RETURNS',body:'<div class="code-block">def add(a, b):\n    return a + b\n\nprint(add(10, 5))  # 15\n\n# Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))    # 9\nprint(power(2, 8)) # 256</div>'},
{title:'IMPORTING MODULES',body:'<div class="code-block">import os\nimport random\nimport socket\nimport requests\nimport datetime\n\nprint(os.getcwd())           # Current dir\nprint(random.randint(1,10))  # Random num\nprint(datetime.date.today()) # Today</div>'},
{title:'BUILD A TOOL',body:'<div class="code-block">import socket\n\ndef check_port(host, port):\n    try:\n        s = socket.socket()\n        s.settimeout(1)\n        result = s.connect_ex((host, port))\n        s.close()\n        return result == 0\n    except:\n        return False\n\nfor port in [80, 443, 22]:\n    status = "OPEN" if check_port("google.com", port) else "closed"\n    print(f"Port {port}: {status}")</div><div class="tip-box">You just learned to write a port scanner in Python! 🎉</div>'}
],
quizzes:[
{q:'What keyword creates a function?',opts:['function','create','def','make'],ans:2},
{q:'What does "return" do?',opts:['Prints result','Exits Python','Sends back a value','Loops back'],ans:2},
{q:'What module is used for network connections?',opts:['os','socket','random','sys'],ans:1},
{q:'What is a default parameter?',opts:['Always required','Value when no argument given','Deletes itself','Global variable'],ans:1}
]},

'javascript-basics':{cat:'coding',title:'JavaScript Essentials',level:'beginner',icon:'⚡',desc:'Make websites interactive',
sections:[
{title:'WHAT IS JAVASCRIPT?',body:'<p>JavaScript (JS) is the language of the web. Every interactive website uses it. It also runs on servers (Node.js), mobile apps, and desktop apps!</p>'},
{title:'JS BASICS',body:'<div class="code-block">let name = "Hacker";   // can change\nconst age = 21;        // cannot change\n\nlet skills = ["js", "python"];\nskills.push("hacking");\n\nlet user = {\n  name: "Neo",\n  greet() { return "Hi " + this.name; }\n};\nconsole.log(user.greet()); // Hi Neo</div>'},
{title:'DOM MANIPULATION',body:'<div class="code-block">// Get elements\nlet title = document.querySelector("h1");\n\n// Change content\ntitle.textContent = "Hacked!";\ntitle.style.color = "red";\n\n// React to clicks\ntitle.addEventListener("click", () => {\n  alert("Clicked!");\n});</div>'},
{title:'FETCH API',body:'<div class="code-block">async function getData(url) {\n  try {\n    let res = await fetch(url);\n    let data = await res.json();\n    console.log(data);\n  } catch(err) {\n    console.error(err);\n  }\n}\n\ngetData("https://api.example.com");</div><div class="tip-box">The Fetch API is how this app\'s AI Tutor gets responses!</div>'}
],
quizzes:[
{q:'Which keyword makes a variable unchangeable?',opts:['let','var','const','static'],ans:2},
{q:'What does DOM stand for?',opts:['Data Object Model','Document Object Model','Dynamic Object Manager','Document Output Mode'],ans:1},
{q:'How to add item to JS array?',opts:['.add()','array+item','.push()','insert()'],ans:2},
{q:'What is Fetch API for?',opts:['Styling pages','Getting server data','Animations','Managing files'],ans:1}
]},

'html-css-basics':{cat:'coding',title:'HTML & CSS Basics',level:'beginner',icon:'🌐',desc:'Build your first webpage',
sections:[
{title:'WHAT IS HTML?',body:'<p>HTML is the skeleton of every webpage. It defines structure using tags.</p><div class="code-block">&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;&lt;title&gt;My Page&lt;/title&gt;&lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Hello World!&lt;/h1&gt;\n    &lt;p&gt;A paragraph&lt;/p&gt;\n    &lt;a href="google.com"&gt;Link&lt;/a&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</div>'},
{title:'COMMON TAGS',body:'<div class="code-block">&lt;h1&gt;-&lt;h6&gt;  Headings\n&lt;p&gt;         Paragraph\n&lt;a&gt;         Link\n&lt;img&gt;       Image\n&lt;div&gt;       Container\n&lt;ul&gt;&lt;li&gt;   List\n&lt;input&gt;     Form input\n&lt;button&gt;    Button</div>'},
{title:'CSS STYLING',body:'<div class="code-block">/* By tag */\nh1 { color: red; }\n\n/* By class */\n.hacker { background: black; }\n\n/* By ID */\n#title { font-size: 2rem; }\n\n/* Flexbox */\n.box {\n  display: flex;\n  justify-content: center;\n}</div>'},
{title:'BUILD SOMETHING',body:'<div class="code-block">&lt;div class="card"&gt;\n  &lt;h2&gt;🛡️ Cyber Academy&lt;/h2&gt;\n  &lt;p&gt;Learning hacking&lt;/p&gt;\n  &lt;button onclick="alert(\'Access!\')"&gt;\n    Enter\n  &lt;/button&gt;\n&lt;/div&gt;\n\n&lt;style&gt;\n.card {\n  background: #0a0a0f;\n  color: #00f5c4;\n  padding: 20px;\n  border-radius: 10px;\n}\n&lt;/style&gt;</div><div class="tip-box">Try this on codepen.io — free online code editor!</div>'}
],
quizzes:[
{q:'What does HTML stand for?',opts:['HyperText Markup Language','High Tech Modern Language','HyperText Modern Links','HyperText Machine Learning'],ans:0},
{q:'Which is the biggest heading?',opts:['h6','h3','h1','h0'],ans:2},
{q:'CSS class selector syntax?',opts:['#hacker','.hacker','hacker','*hacker'],ans:1},
{q:'CSS property for flexible layouts?',opts:['position','float','display: flex','align'],ans:2}
]},

'youtube-growth':{cat:'content',title:'YouTube Growth Secrets',level:'beginner',icon:'🎬',desc:'Grow your channel fast',
sections:[
{title:'THE ALGORITHM',body:'<p>YouTube recommends based on:</p><ul><li>📊 <strong>CTR</strong> — What % click your thumbnail. Good CTR = 4-10%</li><li>⏱️ <strong>Watch Time</strong> — How long people watch</li></ul><p>Both must be high for YouTube to push your video!</p>'},
{title:'THUMBNAIL & TITLE',body:'<ul><li>Bold text (3-5 words max)</li><li>Face with strong emotion</li><li>Curiosity gaps — "I tried this for 30 days..."</li><li>Numbers — "7 Hacks That Changed My Life"</li><li>Results — "Learn Python in 1 Hour"</li></ul><div class="tip-box">Study top videos in your niche. Copy the pattern, not the content!</div>'},
{title:'RETENTION HACKS',body:'<ul><li>⚡ Hook in first 15 seconds — show result first</li><li>✂️ Cut all pauses and "umms"</li><li>🎬 Use B-roll footage</li><li>📝 Add text overlays</li><li>🔄 Pattern interrupt every 30-60 seconds</li><li>🎯 End with cliffhanger</li></ul>'},
{title:'NICHE DOWN',body:'<ul><li>❌ "Tech stuff" — Too broad</li><li>✅ "Coding for Beginners" — Better</li><li>✅ "Python for Hackers" — Even better!</li></ul><p>Post <strong>consistently</strong> — 1 video/week beats 5 then nothing!</p><div class="tip-box">Your first 100 videos are practice. Focus on improvement, not views!</div>'}
],
quizzes:[
{q:'What does CTR stand for?',opts:['Content Traffic Rate','Click-Through Rate','Creator Traffic Ratio','Channel Trending'],ans:1},
{q:'What is a good CTR?',opts:['0-1%','1-2%','4-10%','20-30%'],ans:2},
{q:'How often should you post?',opts:['Every day','Once a month','Consistently (e.g. weekly)','Only when inspired'],ans:2},
{q:'What to show in first 15 seconds?',opts:['Your intro/logo','Subscribe button','The result/hook','Your face'],ans:2}
]},

'tiktok-strategy':{cat:'content',title:'TikTok Strategy 2025',level:'beginner',icon:'📱',desc:'Short-form content that goes viral',
sections:[
{title:'WHY TIKTOK?',body:'<p>TikTok shows your content to people who <strong>don\'t follow you yet</strong> — making it the fastest platform to grow from zero!</p><p>Average user spends <strong>95 minutes/day</strong> on TikTok!</p>'},
{title:'THE ALGORITHM',body:'<ul><li>⏱️ Watch time — Do they watch to end?</li><li>🔁 Replays — Do they watch again?</li><li>💬 Comments — Does it spark discussion?</li><li>❤️ Shares — Is it shareable?</li></ul><div class="tip-box">Make people replay! Put something confusing but satisfying at the start.</div>'},
{title:'VIRAL FORMULA',body:'<div class="code-block">❌ Bad: "Hi guys, today I want to talk about..."\n✅ Good: "This Python trick saved me 10 hours"\n\nFormula:\n1. Hook (stop scrolling in 1-3 sec)\n2. Promise (what they\'ll learn)\n3. Value (real info)\n4. Reward (deliver promise)\n5. CTA (follow, comment)</div>'},
{title:'CONTENT IDEAS',body:'<ul><li>"I hacked my own phone in 60 seconds"</li><li>"Python trick that will blow your mind"</li><li>"Is your WiFi password safe? (check this)"</li><li>"5 apps hackers use that you don\'t know"</li><li>"Red flags your phone is hacked right now"</li></ul><div class="tip-box">Cybersecurity content performs extremely well on TikTok — people are curious and scared!</div>'}
],
quizzes:[
{q:'What makes TikTok different?',opts:['Better quality','Shows to non-followers','For young only','Requires payment'],ans:1},
{q:'Average daily TikTok usage?',opts:['15 min','30 min','60 min','95 min'],ans:3},
{q:'Most important TikTok metric?',opts:['Follower count','Watch time','Profile pic','Account age'],ans:1},
{q:'What should your hook do?',opts:['Introduce yourself','Show logo','Stop scrolling','Ask for likes'],ans:2}
]},

'viral-titles':{cat:'content',title:'Writing Viral Titles',level:'beginner',icon:'✍️',desc:'Copywriting for content creators',
sections:[
{title:'WHY TITLES MATTER',body:'<p>Your title + thumbnail decides if anyone clicks. The best video with a boring title gets zero views. Copywriting is one of the most valuable skills for creators!</p>'},
{title:'TITLE FORMULAS',body:'<div class="code-block">// Numbers\n"7 Python Tricks Every Hacker Needs"\n"10 Signs Your Phone Is Being Hacked"\n\n// How-to\n"How to Hack WiFi in 5 Min (Legally)"\n"How I Made $5000 from One TikTok"\n\n// Curiosity\n"The Hack Nobody Talks About"\n"What They Don\'t Tell You About Security"\n\n// Before/After\n"Beginner to Hacker in 30 Days"</div>'},
{title:'POWER WORDS',body:'<ul><li>🔥 Secret, Hidden, Revealed, Exposed</li><li>⚡ Instantly, Fast, Quick, In Minutes</li><li>😱 Shocking, Insane, Crazy, Unbelievable</li><li>🎯 Ultimate, Complete, Master, Guide</li><li>⚠️ Warning, Stop, Never, Always</li></ul><div class="tip-box">Power words attract clicks BUT your content must deliver! Never clickbait.</div>'},
{title:'MISTAKES TO AVOID',body:'<ul><li>❌ Vague: "My thoughts on hacking"</li><li>✅ Specific: "Why 90% of Hackers Use Python"</li><li>❌ Boring: "Cybersecurity tutorial part 1"</li><li>✅ Exciting: "I Got Paid to Hack a Company"</li><li>❌ Over 60 characters — gets cut off on mobile</li><li>❌ ALL CAPS — looks spammy</li></ul>'}
],
quizzes:[
{q:'Which uses a number in the formula?',opts:['How-to formula','Numbers formula','Curiosity gap','Before/After'],ans:1},
{q:'What is clickbaiting?',opts:['Using numbers','Great thumbnail','Promise content doesn\'t deliver','Using power words'],ans:2},
{q:'YouTube title should be under how many characters?',opts:['30','60','100','150'],ans:1},
{q:'Which is the better title?',opts:['My Python Tutorial','How I Learned Python in 7 Days','Python','Tutorial'],ans:1}
]},

'podcasting':{cat:'content',title:'Podcasting 101',level:'beginner',icon:'🎙️',desc:'Start your own audio show',
sections:[
{title:'WHY PODCAST?',body:'<p>460 million podcast listeners worldwide! Advantages over video:</p><ul><li>🎙️ No camera needed</li><li>⏱️ People listen while commuting, exercising</li><li>💰 Easier sponsorships than YouTube</li><li>🤝 Deep connection with audience</li></ul>'},
{title:'EQUIPMENT',body:'<ul><li>🎙️ Mic — Start with your phone! Or Blue Yeti ($130)</li><li>🎧 Headphones — Any earphones work</li><li>💻 Software — Audacity (free), GarageBand (free)</li><li>☁️ Hosting — Anchor.fm (free!)</li></ul><div class="tip-box">Your phone mic is good enough for your first 10 episodes!</div>'},
{title:'EPISODE STRUCTURE',body:'<div class="code-block">1. Intro (30-60 sec)\n   - Music + show name\n   - What this episode covers\n\n2. Main Content (15-45 min)\n   - Stories, knowledge, guests\n   - Use examples\n\n3. Outro (30-60 sec)\n   - Recap key points\n   - Call to action (subscribe!)\n   - Preview next episode</div>'},
{title:'GROW YOUR PODCAST',body:'<ul><li>📱 Share clips on TikTok & Reels</li><li>✍️ Transcribe into blog posts</li><li>🤝 Interview guests with audiences</li><li>⭐ Ask for reviews (helps discovery)</li><li>🔄 Same day every week — be consistent!</li></ul><div class="tip-box">Most podcasters quit after 7 episodes. Just keep going and you\'ll win!</div>'}
],
quizzes:[
{q:'How many podcast listeners worldwide?',opts:['10 million','100 million','460 million','1 billion'],ans:2},
{q:'What free software to record podcasts?',opts:['Adobe Audition','Pro Tools','Audacity','Logic Pro'],ans:2},
{q:'Best free podcast hosting to start?',opts:['Buzzsprout','Podbean','Anchor.fm','Spotify Direct'],ans:2},
{q:'#1 tip for podcast success?',opts:['Expensive equipment','Celebrity interviews','Publish consistently','Perfect audio'],ans:2}
]},

'monetize':{cat:'content',title:'Monetize Your Content',level:'intermediate',icon:'💰',desc:'Turn knowledge into income',
sections:[
{title:'WAYS TO EARN',body:'<ul><li>💛 <strong>Ad Revenue</strong> — YouTube pays per 1000 views</li><li>🤝 <strong>Sponsorships</strong> — Brands pay for mentions</li><li>📦 <strong>Digital Products</strong> — Courses, ebooks, templates</li><li>👑 <strong>Memberships</strong> — Monthly fan subscriptions</li><li>🔗 <strong>Affiliate</strong> — Commission for recommendations</li><li>🎓 <strong>Coaching</strong> — 1-on-1 sessions</li></ul>'},
{title:'YOUTUBE PARTNER PROGRAM',body:'<p>Requirements:</p><ul><li>✅ 1,000 subscribers</li><li>✅ 4,000 watch hours (last 12 months)</li></ul><p>Tech content earns <strong>$15-$30 per 1,000 views</strong> — much higher than average!</p><div class="tip-box">Cybersecurity content has very HIGH RPM — advertisers pay a lot to reach tech audiences!</div>'},
{title:'SPONSORSHIPS',body:'<ul><li>1K-10K followers: $50-$500/video</li><li>10K-100K: $500-$5,000/video</li><li>100K+: $5,000-$50,000+/video</li></ul><p>How to get sponsors:</p><ul><li>Email companies with your media kit</li><li>Join Grapevine or Channel Pages</li><li>Companies will reach out if you\'re consistent</li></ul>'},
{title:'DIGITAL PRODUCTS',body:'<p>Create once, sell forever!</p><ul><li>📚 Ebook — "Beginner\'s Guide to Hacking" ($9-$29)</li><li>🎓 Course — Full video course ($47-$497)</li><li>📋 Templates — Notion, resume ($5-$49)</li></ul><div class="tip-box">Sell on Gumroad.com — free to start, 10% commission only!</div>'}
],
quizzes:[
{q:'RPM for tech/cyber content?',opts:['$0.50-$1','$2-$5','$15-$30','$50-$100'],ans:2},
{q:'Subscribers needed for YouTube Partner?',opts:['100','500','1,000','10,000'],ans:2},
{q:'Most scalable income type?',opts:['Sponsorships','Ad Revenue','Digital Products','Coaching'],ans:2},
{q:'Where to sell digital products for free?',opts:['Amazon','Shopify','Gumroad','Etsy'],ans:2}
]}
};

const TOPICS_DATA = {
  cyber:[
    {id:'network-security',icon:'🌐',name:'How Networks Work',desc:'IP, ports, OSI model',level:'beginner'},
    {id:'encryption',icon:'🔐',name:'Encryption & Cryptography',desc:'How data is kept secret',level:'intermediate'},
    {id:'phishing',icon:'🎣',name:'Phishing & Social Engineering',desc:'Human hacking',level:'beginner'},
    {id:'malware',icon:'🦠',name:'Malware & Viruses',desc:'Types of malicious software',level:'intermediate'},
    {id:'firewalls',icon:'🔥',name:'Firewalls & Defense',desc:'How firewalls protect networks',level:'beginner'},
  ],
  hacking:[
    {id:'what-is-hacking',icon:'💻',name:'Ethical Hacking Intro',desc:'What it is and how to start',level:'beginner'},
    {id:'linux-basics',icon:'🐧',name:'Linux for Hackers',desc:'Essential Linux commands',level:'beginner'},
    {id:'reconnaissance',icon:'🔍',name:'Reconnaissance & OSINT',desc:'Info gathering techniques',level:'intermediate'},
    {id:'nmap-basics',icon:'🚪',name:'Port Scanning with Nmap',desc:'Discover open services',level:'intermediate'},
    {id:'sql-injection',icon:'💉',name:'SQL Injection Basics',desc:'Most common web attack',level:'intermediate'},
  ],
  coding:[
    {id:'python-basics',icon:'🐍',name:'Python Fundamentals',desc:'Variables, lists, dicts',level:'beginner'},
    {id:'python-loops',icon:'🔄',name:'Python Loops & Logic',desc:'For loops, while loops',level:'beginner'},
    {id:'python-functions',icon:'⚙️',name:'Python Functions & Modules',desc:'Write reusable code',level:'beginner'},
    {id:'javascript-basics',icon:'⚡',name:'JavaScript Essentials',desc:'Make websites interactive',level:'beginner'},
    {id:'html-css-basics',icon:'🌐',name:'HTML & CSS Basics',desc:'Build your first webpage',level:'beginner'},
  ],
  content:[
    {id:'youtube-growth',icon:'🎬',name:'YouTube Growth Secrets',desc:'Grow your channel fast',level:'beginner'},
    {id:'tiktok-strategy',icon:'📱',name:'TikTok Strategy 2025',desc:'Short-form viral content',level:'beginner'},
    {id:'viral-titles',icon:'✍️',name:'Writing Viral Titles',desc:'Copywriting for creators',level:'beginner'},
    {id:'podcasting',icon:'🎙️',name:'Podcasting 101',desc:'Start your audio show',level:'beginner'},
    {id:'monetize',icon:'💰',name:'Monetize Your Content',desc:'Make money creating',level:'intermediate'},
  ]
};

function renderTopics(cat) {
  const topics = TOPICS_DATA[cat]||[];
  document.getElementById('topic-list').innerHTML = topics.map(t=>`
    <div class="topic-item" onclick="${t.id?`openLesson('${t.id}')`:"showToast('Coming soon! 🚀')"}">
      <div class="topic-icon">${t.icon}</div>
      <div class="topic-info">
        <div class="topic-name">${t.name}</div>
        <div class="topic-desc">${t.desc}</div>
        <span class="topic-badge badge-${t.level}">${t.level}</span>
      </div>
      <div class="topic-arrow">${t.id?(state.lessons.includes(t.id)?'✅':'›'):'🔒'}</div>
    </div>`).join('');
}

let currentLesson=null,currentSection=0,currentQuiz=0,quizAnswered=false;

function openLesson(id) {
  const lesson=LESSONS[id];
  if(!lesson){showToast('Coming soon! 🚀');return;}
  currentLesson=id;currentSection=0;currentQuiz=0;quizAnswered=false;
  document.getElementById('lesson-title-header').textContent=lesson.title;
  document.getElementById('lesson-cat-header').textContent=lesson.cat.toUpperCase()+' · '+lesson.level.toUpperCase();
  document.getElementById('lesson-view').classList.add('open');
  document.body.style.overflow='hidden';
  renderSection();
  if(!state.lessons.includes(id)){state.lessons.push(id);state.xp+=50;saveState();updateUI();setTimeout(()=>showToast('🎉 +50 XP earned!'),500);}
}

function renderSection() {
  const lesson=LESSONS[currentLesson];
  const totalSec=lesson.sections.length;
  const totalQ=lesson.quizzes.length;
  const isQuiz=currentSection>=totalSec;
  const isDone=isQuiz&&currentQuiz>=totalQ;
  const progress=Math.round(((currentSection+(isQuiz?currentQuiz:0))/(totalSec+totalQ))*100);

  let html=`<div class="section-progress-bar"><div class="section-progress-fill" style="width:${progress}%"></div></div>
  <div class="section-counter">${isQuiz?`Quiz ${currentQuiz+1}/${totalQ}`:`Section ${currentSection+1}/${totalSec}`}</div>`;

  if(isDone){
    const nextId=LESSON_ORDER[LESSON_ORDER.indexOf(currentLesson)+1]||null;
    const nextLesson=nextId?LESSONS[nextId]:null;
    html+=`<div class="completion-screen">
      <div class="completion-emoji">🎉</div>
      <div class="completion-title">LESSON COMPLETE!</div>
      <div class="completion-sub">You crushed it! Keep going!</div>
      <div class="completion-xp">+50 XP + ${lesson.quizzes.filter((_,i)=>i<currentQuiz).length*25} Quiz XP earned!</div>
      ${nextLesson?`<button class="next-lesson-btn" onclick="openLesson('${nextId}')">Next: ${nextLesson.title} →</button>`:''}
      <button class="back-home-btn" onclick="closeLesson()">← Back to Home</button>
    </div>`;
  } else if(isQuiz){
    const quiz=lesson.quizzes[currentQuiz];
    quizAnswered=false;
    html+=`<div class="lesson-content"><div class="quiz-section">
      <div class="quiz-title">// QUIZ ${currentQuiz+1} OF ${totalQ}</div>
      <div class="quiz-q">${quiz.q}</div>
      <div class="quiz-opts" id="quiz-opts">
        ${quiz.opts.map((opt,i)=>`<button class="quiz-opt" onclick="checkAnswerNew(this,${i},${quiz.ans})">${opt}</button>`).join('')}
      </div>
      <div class="quiz-result" id="quiz-result"></div>
    </div></div>`;
  } else {
    const sec=lesson.sections[currentSection];
    html+=`<div class="lesson-content"><h3>// ${sec.title}</h3>${sec.body}</div>
    <button class="continue-btn" onclick="nextSection()">${currentSection<totalSec-1?'Continue →':'Take Quiz →'}</button>`;
  }

  document.getElementById('lesson-content-area').innerHTML=html;
  document.querySelector('.lesson-body').scrollTop=0;
}

function nextSection(){currentSection++;renderSection();}

function checkAnswerNew(btn,selected,correct){
  if(quizAnswered)return;
  quizAnswered=true;
  const opts=document.querySelectorAll('.quiz-opt');
  opts.forEach((o,i)=>{o.disabled=true;if(i===correct)o.classList.add('correct');});
  const result=document.getElementById('quiz-result');
  if(selected===correct){
    btn.classList.add('correct');
    result.style.color='var(--accent)';result.textContent='✅ Correct! +25 XP';
    state.xp+=25;state.quizzes+=1;saveState();updateUI();
  } else {
    btn.classList.add('wrong');
    result.style.color='var(--accent3)';result.textContent='❌ Not quite — correct answer highlighted';
  }
  result.style.display='block';
  setTimeout(()=>{currentQuiz++;renderSection();},1800);
}

function closeLesson(){document.getElementById('lesson-view').classList.remove('open');document.body.style.overflow='';updateUI();}

let chatHistory=[];
const chatArea=document.getElementById('chat-area');

function addMsg(text,role){
  const div=document.createElement('div');
  div.className=`msg ${role}`;
  if(role==='ai')div.innerHTML=`<div class="msg-label">// AI TUTOR</div>${text.replace(/\n/g,'<br>')}`;
  else div.textContent=text;
  chatArea.appendChild(div);
  chatArea.scrollTop=chatArea.scrollHeight;
}

async function sendMessage(){
  const input=document.getElementById('chat-input');
  const msg=input.value.trim();if(!msg)return;
  input.value='';input.style.height='auto';
  addMsg(msg,'user');chatHistory.push({role:'user',content:msg});
  const typing=document.getElementById('typing');
  typing.style.display='block';chatArea.scrollTop=chatArea.scrollHeight;
  document.getElementById('send-btn').disabled=true;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,
    system:'You are an expert AI tutor for LearnHub. Teach cybersecurity, ethical hacking, coding, and content creation. Be clear, practical, beginner-friendly. Keep under 300 words.',
    messages:chatHistory})});
    const data=await res.json();
    const reply=data.content?.[0]?.text||"Sorry, couldn't respond. Try again!";
    typing.style.display='none';chatHistory.push({role:'assistant',content:reply});addMsg(reply,'ai');
  }catch(e){typing.style.display='none';addMsg("⚠️ Connection issue. Check internet!","ai");}
  document.getElementById('send-btn').disabled=false;chatArea.scrollTop=chatArea.scrollHeight;
}

function sendChip(chip){document.getElementById('chat-input').value=chip.textContent;sendMessage();}
function handleKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();}}
document.getElementById('chat-input').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,100)+'px';});

const MODAL_CONTENT={
  kali:{title:'🐉 KALI LINUX GUIDE',body:`<div class="code-block">1. Download: kali.org/get-kali\n2. Install VirtualBox (free)\n3. Import Kali VM\n4. Login: kali / kali\n\nTop tools:\nnmap, metasploit, wireshark\nburpsuite, john, aircrack, sqlmap</div>`},
  cheatsheet:{title:'📋 HACKING CHEATSHEET',body:`<div class="code-block"># NMAP\nnmap -sV 192.168.1.1\nnmap -A TARGET\nnmap -p- TARGET\nnmap -sS TARGET\n\n# LINUX\nifconfig / netstat -tuln\nfind / -name "*.txt"\ngrep -r "password" /etc\n\n# PYTHON\npython3 -m http.server 8080</div>`},
  roadmap:{title:'🗺️ LEARNING ROADMAP',body:`<div style="display:flex;flex-direction:column;gap:10px">${['🟢 Phase 1 (1-2 months)\n→ Linux basics\n→ Networking\n→ Python basics','🟡 Phase 2 (2-3 months)\n→ TryHackMe beginner path\n→ OWASP Top 10\n→ HackTheBox','🔵 Phase 3 (3+ months)\n→ Pick specialization\n→ CEH or Security+\n→ Build home lab','🔴 Phase 4: Real Work\n→ Bug bounty (HackerOne)\n→ CTF competitions\n→ Get hired!'].map(p=>`<div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:12px;font-family:var(--font-mono);font-size:0.72rem;color:var(--text);white-space:pre-line">${p}</div>`).join('')}</div>`},
  resources:{title:'🔗 FREE RESOURCES',body:`<div style="display:flex;flex-direction:column;gap:10px">${[['🎯','TryHackMe','tryhackme.com','Best beginner hacking labs'],['⚔️','HackTheBox','hackthebox.com','Real challenges'],['🐍','Python','docs.python.org','Official tutorials'],['📹','NetworkChuck','YouTube','Free hacking videos'],['🏆','CTFtime','ctftime.org','Competitions'],['💻','Replit','replit.com','Code in browser']].map(([icon,name,url,desc])=>`<div style="background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;gap:12px;align-items:center"><span style="font-size:1.5rem">${icon}</span><div><div style="font-weight:700;color:var(--text);font-size:0.88rem">${name}</div><div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--accent)">${url}</div><div style="font-size:0.78rem;color:var(--text2)">${desc}</div></div></div>`).join('')}</div>`},
  glossary:{title:'📖 TECH GLOSSARY',body:`<div style="display:flex;flex-direction:column;gap:8px">${[['CVE','Common Vulnerabilities and Exposures database'],['DDoS','Distributed Denial of Service — flood attack'],['DNS','Translates domain names to IP addresses'],['Exploit','Code using a vulnerability'],['Firewall','Filters network traffic'],['Hash','One-way encryption fingerprint'],['Payload','Malicious code in an exploit'],['Pentest','Authorized simulated attack'],['VPN','Encrypts your connection'],['Zero-Day','Unknown vulnerability, no patch yet'],['XSS','Cross-Site Scripting — inject scripts'],['MFA','Multi-Factor Authentication'],['OSINT','Open Source Intelligence gathering']].map(([t,d])=>`<div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:12px"><div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent);margin-bottom:3px">${t}</div><div style="font-size:0.83rem;color:var(--text)">${d}</div></div>`).join('')}</div>`}
};

function openModal(key){const m=MODAL_CONTENT[key];if(!m)return;document.getElementById('modal-title').textContent=m.title;document.getElementById('modal-body').innerHTML=m.body;document.getElementById('modal').classList.add('open');document.body.style.overflow='hidden';}
function closeModal(){document.getElementById('modal').classList.remove('open');document.body.style.overflow='';}

function showToast(msg){const t=document.createElement('div');t.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--bg2);border:1px solid var(--accent);color:var(--text);padding:10px 20px;border-radius:20px;font-family:var(--font-body);font-size:0.85rem;z-index:999;animation:fadeIn 0.3s ease;white-space:nowrap;box-shadow:0 4px 20px rgba(0,245,196,0.2);';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2500);}

const mfd={name:"LearnHub",short_name:"LearnHub",start_url:"./",display:"standalone",background_color:"#0a0a0f",theme_color:"#00f5c4",icons:[{src:"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230a0a0f'/><text y='70' x='10' font-size='65'>🛡️</text></svg>",sizes:"192x192",type:"image/svg+xml"}]};
const mblob=new Blob([JSON.stringify(mfd)],{type:'application/json'});
const mlnk=document.createElement('link');mlnk.rel='manifest';mlnk.href=URL.createObjectURL(mblob);document.head.appendChild(mlnk);

if('serviceWorker'in navigator){const sw=`const C='lh-v3';self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['/'])));self.skipWaiting();});self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>new Response('Offline'))));});`;navigator.serviceWorker.register(URL.createObjectURL(new Blob([sw],{type:'text/javascript'}))).catch(()=>{});}
