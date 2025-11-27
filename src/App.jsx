// App.jsx
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDark, setIsDark] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentStory, setCurrentStory] = useState(0);
  const [currentRole, setCurrentRole] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const heroRef = useRef(null);

  const stories = [
    {
      title: "The Beginning",
      content:
        "My journey started with exploring programming fundamentals and building my first applications. The curiosity to create digital solutions sparked my passion for technology.",
      year: "2019",
      emoji: "👶",
    },
    {
      title: "Web Development Foundation",
      content:
        "Built responsive websites using HTML/CSS and JavaScript. Learned the importance of clean code and user experience in web applications.",
      year: "2020-2021",
      emoji: "🌐",
    },
    {
      title: "Full-Stack Discovery",
      content:
        "Explored React.js and backend technologies. Built my first full-stack applications and understood component-based architecture.",
      year: "2022",
      emoji: "⚛️",
    },
    {
      title: "Professional Internships",
      content:
        "Started professional journey with internships, working on real-world projects and AI-integrated applications.",
      year: "2023-2024",
      emoji: "💼",
    },
    {
      title: "AI & Innovation",
      content:
        "Developed AI-powered applications, participated in hackathons including NASA Space Apps Challenge, and continued growing as a full-stack developer.",
      year: "2024-2025",
      emoji: "🚀",
    },
  ];

  const roles = [
    "Full-Stack Developer",
    "Java Developer",
    "AI Enthusiast",
    "Problem Solver",
    "Web Developer",
    "Backend Engineer",
  ];

  const stats = [
    { number: "20+", label: "Projects Built", icon: "🚀" },
    { number: "15+", label: "Technologies", icon: "🛠️" },
    { number: "3+", label: "Years Experience", icon: "📈" },
    { number: "2", label: "Professional Internships", icon: "💼" },
    { number: "NASA", label: "Space Apps Challenge", icon: "⭐" },
    { number: "∞", label: "Passion & Creativity", icon: "🎨" },
  ];

  const techStack = [
    {
      category: "Languages",
      items: ["Java", "Python", "JavaScript", "SQL", "C++"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Frontend",
      items: ["React.js", "HTML5", "CSS3"],
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "RESTful APIs"],
      color: "from-purple-500 to-pink-500",
    },
    {
      category: "Databases",
      items: ["MongoDB", "PostgreSQL", "MySQL"],
      color: "from-orange-500 to-red-500",
    },
  ];

  useEffect(() => {
    // Typing animation for main headline
    const fullText =
      "Building Modern Web Applications with Java, React & AI Integration";
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      }
    }, 50);

    // Role rotation
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);

    // Story auto-advance
    const storyInterval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 5000);

    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update active section
      const sections = [
        "home",
        "story",
        "skills",
        "projects",
        "code",
        "timeline",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    // Initialize advanced background
    initAdvancedBackground();

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(typingInterval);
      clearInterval(roleInterval);
      clearInterval(storyInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const initAdvancedBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;

    // Create advanced particles with different behaviors
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        shape:
          Math.random() > 0.7
            ? "triangle"
            : Math.random() > 0.4
            ? "square"
            : "circle",
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        pulseSpeed: Math.random() * 0.05 + 0.01,
        pulseSize: 0,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position with some randomness
        particle.x +=
          particle.speedX + Math.sin(Date.now() * 0.001 + particle.x) * 0.3;
        particle.y +=
          particle.speedY + Math.cos(Date.now() * 0.001 + particle.y) * 0.3;
        particle.rotation += particle.rotationSpeed;
        particle.pulseSize = Math.sin(Date.now() * particle.pulseSpeed) * 2;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;

        const currentSize = Math.max(0.5, particle.size + particle.pulseSize);

        switch (particle.shape) {
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "square":
            ctx.fillRect(
              -currentSize,
              -currentSize,
              currentSize * 2,
              currentSize * 2
            );
            break;
          case "triangle":
            ctx.beginPath();
            ctx.moveTo(0, -currentSize);
            ctx.lineTo(-currentSize, currentSize);
            ctx.lineTo(currentSize, currentSize);
            ctx.closePath();
            ctx.fill();
            break;
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Live code examples data
  const codeExamples = [
    {
      title: "React Component",
      language: "jsx",
      code: `function AIInterviewMocker() {
  const [interview, setInterview] = useState([]);
  const [feedback, setFeedback] = useState('');
  
  return (
    <div className="interview-platform">
      <SpeechToText onTranscript={handleAnswer} />
      <GeminiAI analysis={feedback} />
      <PerformanceAnalytics data={interview} />
    </div>
  );
}`,
      description: "AI Interview Mocker with React & Google Gemini AI",
    },
    {
      title: "Node.js API",
      language: "javascript",
      code: `app.post('/api/voicemail', async (req, res) => {
  try {
    const { message, phone, email } = req.body;
    
    // Store in MongoDB
    const voicemail = await Voicemail.create({
      message, phone, email
    });
    
    // Send notifications
    await TwilioAPI.sendSMS(phone);
    await sendEmailNotification(email);
    
    res.json({ success: true, data: voicemail });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Message processing failed' 
    });
  }
});`,
      description: "Voicemail System with Twilio API integration",
    },
    {
      title: "Database Schema",
      language: "javascript",
      code: `const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  category: { 
    type: String, 
    enum: ['fullstack', 'ai', 'backend', 'frontend'] 
  },
  createdAt: { type: Date, default: Date.now }
});`,
      description: "MongoDB schema for project management",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Advanced Animated Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sound Control */}
      <button
        onClick={toggleAudio}
        className={`fixed top-4 right-4 z-50 w-12 h-12 rounded-full backdrop-blur-sm border-2 flex items-center justify-center transition-all ${
          isDark
            ? "bg-gray-800/50 border-purple-500 hover:bg-purple-500/20"
            : "bg-white/50 border-cyan-500 hover:bg-cyan-500/20"
        }`}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-4 right-20 z-50 w-12 h-12 rounded-full backdrop-blur-sm border-2 flex items-center justify-center transition-all ${
          isDark
            ? "bg-gray-800/50 border-yellow-500 hover:bg-yellow-500/20"
            : "bg-white/50 border-orange-500 hover:bg-orange-500/20"
        }`}
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* Main Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 backdrop-blur-lg bg-gray-900/80 border border-gray-700 rounded-2xl px-6 py-3">
        <div className="flex items-center space-x-8">
          {[
            "home",
            "story",
            "skills",
            "projects",
            "code",
            "timeline",
            "contact",
          ].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeSection === item
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* MEGA HOME SECTION - Complete Immersive Introduction */}
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl opacity-20 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                }}
              >
                {
                  [
                    "⚡",
                    "🚀",
                    "💻",
                    "🎨",
                    "🔧",
                    "🌟",
                    "💫",
                    "🎯",
                    "🛠️",
                    "⚙️",
                    "🔮",
                    "🎪",
                  ][i]
                }
              </div>
            ))}
          </div>

          {/* Main Avatar with Complex Animation */}
          <div className="relative mb-16">
            <div className="relative w-64 h-64 mx-auto">
              {/* Outer Glow Rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse opacity-30 blur-3xl"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 animate-spin-slow opacity-50"></div>

              {/* Main Avatar */}
              <div className="absolute inset-8 bg-gray-900 rounded-full flex items-center justify-center border-4 border-transparent bg-gradient-to-r from-purple-500 to-cyan-500 bg-origin-border">
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    DS
                  </span>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-xl shadow-2xl">
                  ⚡
                </div>
              </div>
              <div className="absolute inset-0 animate-spin-slow-reverse">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-lg shadow-2xl">
                  🚀
                </div>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-7xl md:text-9xl font-black mb-8">
            <span className="block text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text bg-size-200 animate-gradient">
              DANISH
            </span>
            <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text bg-size-200 animate-gradient mt-4">
              SHAIKH
            </span>
          </h1>

          {/* Dynamic Role Text */}
          <div className="text-3xl md:text-5xl mb-12 min-h-[80px] flex items-center justify-center">
            <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {roles[currentRole]}
            </span>
          </div>

          {/* Typing Animation Text */}
          <div className="text-2xl md:text-4xl mb-12 min-h-[120px] flex items-center justify-center">
            <span className="font-light text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {typedText}
              <span className="animate-pulse text-cyan-400">|</span>
            </span>
          </div>

          {/* Personal Introduction */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              Welcome to my digital portfolio! I'm Danish Shaikh, a passionate
              Full-Stack Developer specializing in Java, React.js, and
              AI-integrated applications. I have hands-on experience building modern 
              web applications and scalable backend systems.
            </p>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              With a proven track record in developing AI-powered solutions and
              RESTful APIs, I'm constantly exploring new technologies and
              methodologies to create meaningful digital experiences that solve
              real-world problems.
            </p>
          </div>

          {/* Interactive Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group backdrop-blur-sm bg-gray-800/50 rounded-2xl p-6 border border-gray-700 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:border-cyan-400/50"
              >
                <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack Overview */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-cyan-400">
              Tech Stack Mastery
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {techStack.map((stack, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm bg-gray-800/50 rounded-2xl p-6 border border-gray-700 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stack.color} flex items-center justify-center text-white font-bold mb-4`}
                  >
                    {stack.category.charAt(0)}
                  </div>
                  <h4 className="text-lg font-bold mb-3">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="px-3 py-1 bg-gray-700/50 rounded-lg text-sm text-cyan-400 border border-gray-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Philosophy */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-cyan-400/30">
              <h3 className="text-3xl font-bold mb-6 text-center text-cyan-400">
                My Development Philosophy
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-xl font-bold mb-2">
                    User-Centric Design
                  </h4>
                  <p className="text-gray-300">
                    Creating experiences that users love and remember
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h4 className="text-xl font-bold mb-2">Performance First</h4>
                  <p className="text-gray-300">
                    Lightning-fast applications with optimized code
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🔧</div>
                  <h4 className="text-xl font-bold mb-2">Clean Code</h4>
                  <p className="text-gray-300">
                    Maintainable, scalable, and well-documented solutions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
              Ready to Create Something Amazing?
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => scrollToSection("projects")}
                className="group px-16 py-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl font-bold text-2xl text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-cyan-500/25"
              >
                <span className="flex items-center space-x-4">
                  <span>🚀 Explore My Work</span>
                  <span className="group-hover:rotate-180 transition-transform duration-500">
                    ✨
                  </span>
                </span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group px-16 py-6 border-2 border-cyan-400 rounded-2xl font-bold text-2xl text-cyan-400 transition-all duration-500 hover:scale-110 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <span className="flex items-center space-x-4">
                  <span>💬 Let's Talk</span>
                  <span className="group-hover:animate-bounce">👇</span>
                </span>
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToSection("story")}
              className="w-16 h-16 border-2 border-cyan-400/50 rounded-full flex items-center justify-center text-cyan-400 text-2xl hover:bg-cyan-400/10 transition-all duration-300 hover:scale-110"
            >
              ↓
            </button>
          </div>
        </div>

        {/* Background Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Professional Experience
            </span>
          </h2>

          <div className="space-y-12">
            {/* Symbiosis Experience */}
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-gray-700 transition-all duration-500 hover:scale-105">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400">
                    Full Stack Java Developer
                  </h3>
                  <p className="text-lg text-purple-400">
                    Software Development Company
                  </p>
                </div>
                <div className="text-lg text-yellow-400 font-semibold mt-2 md:mt-0">
                  Dec 2024 – May 2025
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">▸</span>
                  Completed full-stack Java and Node.js projects, strengthening
                  React, Express, and database skills
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">▸</span>
                  Developed Voicemail System with Node.js backend and MongoDB,
                  implementing SMS and email notifications via Twilio API
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">▸</span>
                  Enhanced skills in backend logic, API integration, and
                  front-end data display through project development
                </li>
              </ul>
            </div>

            {/* Sumago Experience */}
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-gray-700 transition-all duration-500 hover:scale-105">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400">
                    Full Stack Development Intern
                  </h3>
                  <p className="text-lg text-purple-400">
                    IT Solutions Company
                  </p>
                </div>
                <div className="text-lg text-yellow-400 font-semibold mt-2 md:mt-0">
                  Dec 2023 – Jan 2024
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">▸</span>
                  Developed web applications using React.js with responsive UIs
                  and component-based architecture
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">▸</span>
                  Built AI Interview Mocker integrating speech-to-text, Google
                  Gemini AI, and PostgreSQL for AI-driven feedback
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">▸</span>
                  Gained hands-on experience in frontend-backend integration,
                  data storage, and feature implementation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Featured Projects
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Interview Mocker */}
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-gray-700 transition-all duration-500 hover:scale-105 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                    AI Interview Mocker
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      React.js
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      PostgreSQL
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      Google Gemini AI
                    </span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                      Clerk
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Built a full-stack AI interview simulator for real-time answer
                evaluation and personalized feedback. Integrated speech-to-text
                and Google Gemini AI for intelligent question generation and
                answer scoring.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  "Real-time Evaluation",
                  "Speech-to-Text",
                  "AI Feedback",
                  "Performance Analytics",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-cyan-400"
                  >
                    <span>▸</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <div className="text-green-400 font-bold">AI-Powered</div>
                <div className="text-green-400 font-bold">
                  Real-time Analysis
                </div>
                <div className="text-green-400 font-bold">
                  Personalized Feedback
                </div>
              </div>
            </div>

            {/* Voicemail System */}
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-gray-700 transition-all duration-500 hover:scale-105 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                    Voicemail System
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                      MongoDB
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      Twilio API
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Developed RESTful APIs for secure message storage and retrieval
                with robust authentication. Integrated Twilio API for SMS and
                email notifications, enabling real-time alerts for new messages.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  "RESTful APIs",
                  "SMS Notifications",
                  "Email Alerts",
                  "Secure Storage",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-cyan-400"
                  >
                    <span>▸</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <div className="text-green-400 font-bold">Real-time</div>
                <div className="text-green-400 font-bold">Secure</div>
                <div className="text-green-400 font-bold">Multi-channel</div>
              </div>
            </div>

            {/* Bookstore App */}
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-gray-700 transition-all duration-500 hover:scale-105 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                    Bookstore App
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      React.js
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      Express.js
                    </span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                      MongoDB Atlas
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Built a full-stack e-commerce template to efficiently manage and
                display book catalog data. Implemented responsive front-end
                rendering with dynamic data display and user-friendly interface.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  "E-commerce",
                  "CRUD Operations",
                  "Responsive UI",
                  "MongoDB Atlas",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-cyan-400"
                  >
                    <span>▸</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <div className="text-green-400 font-bold">Full-Stack</div>
                <div className="text-green-400 font-bold">Responsive</div>
                <div className="text-green-400 font-bold">Scalable</div>
              </div>
            </div>

            {/* Additional Projects */}
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-gray-700 transition-all duration-500 hover:scale-105 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                    Other Projects
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      Java
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      MySQL
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      Cybersecurity
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Student Management System, SecureAuth authentication, PhishNet
                cybersecurity project, and various full-stack applications
                showcasing diverse technical skills.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  "Java Console Apps",
                  "Authentication Systems",
                  "Cybersecurity",
                  "Database Management",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-cyan-400"
                  >
                    <span>▸</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <div className="text-green-400 font-bold">Diverse</div>
                <div className="text-green-400 font-bold">Secure</div>
                <div className="text-green-400 font-bold">Innovative</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION & CERTIFICATIONS */}
      <section
        id="education"
        className={`py-20 ${isDark ? "bg-gray-800/30" : "bg-gray-100/50"}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Education & Certifications
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
                Education
              </h3>

              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-purple-400">
                    B.E. in Information Technology
                  </h4>
                  <p className="text-lg text-yellow-400">
                    University
                  </p>
                  <p className="text-gray-300">2021 – 2025</p>
                </div>

                <div className="text-center">
                  <h4 className="text-xl font-bold text-purple-400">
                    HSC (PCMB)
                  </h4>
                  <p className="text-lg text-yellow-400">
                    State Board
                  </p>
                  <p className="text-gray-300">First Class | 2021</p>
                </div>

                <div className="text-center">
                  <h4 className="text-xl font-bold text-purple-400">SSC</h4>
                  <p className="text-lg text-yellow-400">
                    State Board
                  </p>
                  <p className="text-gray-300">First Class | 2019</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
                Certifications
              </h3>

              <div className="space-y-4">
                {[
                  "Full Stack Development (React.js)",
                  "Full Stack Java",
                  "NPTEL — Programming in Java",
                  "Galactic Problem Solver — NASA Space Apps",
                  "Runner-Up — PICT Hackathon",
                ].map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-gray-700/30"
                  >
                    <span className="text-green-400 text-xl">✓</span>
                    <span className="text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEEP ALL YOUR EXISTING SECTIONS BELOW - They remain exactly the same */}
      <section id="story" className="py-20 relative">
        {/* Your existing story section code */}
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              My Journey
            </span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
                isDark
                  ? "bg-gradient-to-b from-purple-500 to-cyan-500"
                  : "bg-gradient-to-b from-purple-400 to-cyan-400"
              }`}
            ></div>

            {/* Stories */}
            <div className="space-y-12">
              {stories.map((story, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}
                  >
                    <div
                      className={`backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 hover:scale-105 cursor-pointer ${
                        currentStory === index ? "scale-105" : "scale-100"
                      } ${
                        isDark
                          ? "bg-gray-800/50 border-purple-500/30 hover:border-cyan-500/50"
                          : "bg-white/50 border-purple-400/30 hover:border-cyan-400/50"
                      }`}
                      onClick={() => setCurrentStory(index)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`text-3xl ${
                            currentStory === index ? "animate-bounce" : ""
                          }`}
                        >
                          {story.emoji}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{story.title}</h3>
                          <div
                            className={`text-sm ${
                              isDark ? "text-cyan-400" : "text-purple-600"
                            }`}
                          >
                            {story.year}
                          </div>
                        </div>
                      </div>
                      <p
                        className={`leading-relaxed ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {story.content}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 ${
                      isDark
                        ? "bg-gray-900 border-cyan-500"
                        : "bg-white border-purple-400"
                    } ${currentStory === index ? "animate-pulse" : ""}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Code Demos Section */}
      <section
        id="code"
        className={`py-20 ${isDark ? "bg-gray-800/30" : "bg-gray-100/50"}`}
      >
        {/* Your existing code section */}
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Live Code Demos
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Code Examples */}
            <div className="space-y-8">
              {codeExamples.map((example, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-sm rounded-3xl overflow-hidden border transition-all duration-500 hover:scale-105 ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700"
                      : "bg-white/50 border-gray-300"
                  }`}
                >
                  <div
                    className={`p-4 border-b ${
                      isDark
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-200 border-gray-300"
                    }`}
                  >
                    <h3 className="font-bold">{example.title}</h3>
                    <div className="text-sm opacity-70">
                      {example.description}
                    </div>
                  </div>
                  <pre
                    className={`p-6 overflow-x-auto text-sm ${
                      isDark
                        ? "text-green-400 bg-gray-900/50"
                        : "text-green-600 bg-gray-50"
                    }`}
                  >
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>

            {/* Skills Visualization */}
            <div
              className={`backdrop-blur-sm rounded-3xl p-8 border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white/50 border-gray-300"
              }`}
            >
              <h3 className="text-3xl font-bold mb-8 text-center">
                Skills Matrix
              </h3>

              <div className="space-y-6">
                {[
                  {
                    skill: "React/Next.js",
                    level: 85,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    skill: "Node.js/Express",
                    level: 80,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    skill: "Java Programming",
                    level: 75,
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    skill: "MongoDB/PostgreSQL",
                    level: 80,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    skill: "Python/AI Integration",
                    level: 70,
                    color: "from-yellow-500 to-orange-500",
                  },
                  {
                    skill: "RESTful APIs",
                    level: 85,
                    color: "from-pink-500 to-rose-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.skill}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div
                      className={`w-full h-3 rounded-full ${
                        isDark ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Radar */}
              <div className="mt-12">
                <h4 className="text-xl font-bold mb-6 text-center">
                  Tech Radar
                </h4>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {[
                    "React",
                    "Node.js",
                    "Java",
                    "MongoDB",
                    "PostgreSQL",
                    "Python",
                    "Express",
                    "MySQL",
                  ].map((tech, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 ${
                        isDark
                          ? "bg-purple-500/20 border-purple-500/30 text-cyan-400 hover:bg-cyan-500/20"
                          : "bg-purple-400/20 border-purple-400/30 text-purple-600 hover:bg-cyan-400/20"
                      }`}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section
        id="timeline"
        className={`py-20 ${isDark ? "bg-gray-800/30" : "bg-gray-100/50"}`}
      >
        {/* Your existing timeline section */}
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Achievements Timeline
            </span>
          </h2>

          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
                isDark
                  ? "bg-gradient-to-b from-purple-500 to-cyan-500"
                  : "bg-gradient-to-b from-purple-400 to-cyan-400"
              }`}
            ></div>

            {[
              {
                year: "2024-2025",
                items: [
                  {
                    type: "experience",
                    title: "Full Stack Java Developer",
                    icon: "💼",
                  },
                  {
                    type: "certification",
                    title: "NASA Space Apps",
                    icon: "🚀",
                  },
                  { type: "project", title: "AI Interview Mocker", icon: "🤖" },
                ],
              },
              {
                year: "2023-2024",
                items: [
                  {
                    type: "internship",
                    title: "Full Stack Intern",
                    icon: "🎓",
                  },
                  { type: "project", title: "Voicemail System", icon: "📞" },
                  { type: "award", title: "PICT Hackathon", icon: "🏆" },
                ],
              },
              {
                year: "2021-2022",
                items: [
                  { type: "education", title: "B.E. IT Started", icon: "🎓" },
                  { type: "project", title: "First Web Apps", icon: "🌐" },
                ],
              },
            ].map((yearData, yearIndex) => (
              <div key={yearIndex} className="relative mb-12">
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 ${
                    isDark
                      ? "bg-gray-900 border-cyan-500"
                      : "bg-white border-purple-400"
                  }`}
                ></div>

                <div
                  className={`text-center mb-8 ${
                    isDark ? "text-cyan-400" : "text-purple-600"
                  }`}
                >
                  <div className="text-2xl font-bold">{yearData.year}</div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  {yearData.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`backdrop-blur-sm rounded-2xl p-4 text-center border transition-all duration-300 hover:scale-105 ${
                        isDark
                          ? "bg-gray-800/50 border-gray-700 hover:border-cyan-500/50"
                          : "bg-white/50 border-gray-300 hover:border-purple-400/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="font-semibold">{item.title}</div>
                      <div
                        className={`text-xs mt-1 ${
                          isDark ? "text-cyan-400" : "text-purple-600"
                        }`}
                      >
                        {item.type.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        {/* Your existing contact section */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Let's Connect
            </span>
          </h2>

          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Ready to create something extraordinary? Let's connect and bring
            your ideas to life.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: "📧",
                label: "Email",
                value: "Available on request",
                action: "#contact",
              },
              {
                icon: "📱",
                label: "Phone",
                value: "Available on request",
                action: "#contact",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "Connect via LinkedIn",
                action: "#contact",
              },
              {
                icon: "🐙",
                label: "GitHub",
                value: "Portfolio available",
                action: "#contact",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className={`backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 hover:scale-105 group ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white/50 border-gray-300"
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform ${
                    isDark ? "bg-purple-500/20" : "bg-cyan-400/20"
                  }`}
                >
                  {contact.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{contact.label}</h3>
                <div className={isDark ? "text-cyan-400" : "text-purple-600"}>
                  {contact.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Contact Form */}
          <div
            className={`backdrop-blur-sm rounded-3xl p-8 border max-w-2xl mx-auto ${
              isDark
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white/50 border-gray-300"
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  isDark
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/70 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  isDark
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/70 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  isDark
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/70 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              ></textarea>
              <button
                className={`p-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                    : "bg-gradient-to-r from-purple-400 to-cyan-400 hover:from-purple-500 hover:to-cyan-500 text-white"
                }`}
              >
                🚀 Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 border-t backdrop-blur-sm ${
          isDark
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDark
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                  : "bg-gradient-to-r from-purple-400 to-cyan-400"
              }`}
            >
              <span className="font-bold text-white">DS</span>
            </div>
            <span className="text-xl font-bold">Danish Shaikh</span>
          </div>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Crafting the future, one line of code at a time • © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;