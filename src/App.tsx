/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, ChevronLeft, Award, Users, Briefcase, 
  Globe, Cpu, Zap, GraduationCap, Calendar, Bell, 
  Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin
} from 'lucide-react';

// --- Constants & Data ---

const DEPARTMENTS = [
  { name: "Computer Engineering", icon: "💻", tagline: "Architecting the digital landscape." },
  { name: "CSE (Data Science)", icon: "📊", tagline: "Turning raw data into intelligence." },
  { name: "Information Technology", icon: "🌐", tagline: "Connecting the world through code." },
  { name: "AI & Data Science", icon: "🤖", tagline: "Pioneering the cognitive revolution." },
  { name: "Mechanical Engineering", icon: "⚙️", tagline: "Engineering motion and power." },
  { name: "EXTC Engineering", icon: "📡", tagline: "Bridging distances with signal." },
  { name: "Civil Engineering", icon: "🏗️", tagline: "Building the foundations of society." },
  { name: "First Year", icon: "🚀", tagline: "Igniting the spark of engineering." },
];

const PLACEMENT_DATA = [
  { year: "17-18", count: 299 },
  { year: "18-19", count: 320 },
  { year: "19-20", count: 263 },
  { year: "20-21", count: 305 },
  { year: "21-22", count: 257 },
  { year: "22-23", count: 261 },
  { year: "23-24", count: 228 },
  { year: "24-25", count: 241 },
];

const RECRUITERS = [
  "Mahindra", "Infosys", "Capgemini", "Wipro", "Accenture", 
  "IBM", "Cognizant", "TCS", "L&T", "Tata Power", 
  "Hexaware", "Vodafone", "Zeus Learning"
];

const ACHIEVEMENTS = [
  {
    title: "Perplexity Placement — ₹1.06 Cr/year",
    desc: "Jitendra Prajapati secured a record-breaking international offer.",
    badge: "🏆 National",
    category: "Placement"
  },
  {
    title: "SIH 2023 Grand Finale Winner",
    desc: "Team Softracker emerged victorious at the Smart India Hackathon.",
    badge: "🚀 Innovation",
    category: "Hackathon"
  },
  {
    title: "5× National Solar EV Champions",
    desc: "Team Solecthon dominates the national solar vehicle circuit.",
    badge: "🌍 Research",
    category: "Automotive"
  },
  {
    title: "1st Place SkyGlider — IIT BHU",
    desc: "Team Airnova secured top honors at the prestigious Techfest.",
    badge: "🏆 National",
    category: "Aero"
  },
  {
    title: "Patent Awarded",
    desc: "Ms. Vaishali Shirsath & Ms. Pragati Patil for innovative research.",
    badge: "🌍 Research",
    category: "IPR"
  },
  {
    title: "Weather Radar MoU",
    desc: "Strategic collaboration between IITM Pune and VCET.",
    badge: "🚀 Innovation",
    category: "MoU"
  }
];

const CAMPUS_LIFE = {
  Sports: [
    { title: "Kabaddi Team", emoji: "🤼", desc: "State-level champions in traditional sports." },
    { title: "Badminton", emoji: "🏸", desc: "High-intensity indoor court action." },
    { title: "Mallakhamb", emoji: "🤸", desc: "Preserving heritage through physical excellence." },
  ],
  Cultural: [
    { title: "Cultural Committee", emoji: "🎭", desc: "The heart of VCET's artistic expression." },
    { title: "ZEAL", emoji: "✨", desc: "Our massive annual cultural extravaganza." },
    { title: "NSS", emoji: "🤝", desc: "Social service and community development." },
  ],
  Technical: [
    { title: "IEEE Student Branch", emoji: "📡", desc: "Advancing technology for humanity." },
    { title: "CSI Chapter", emoji: "💻", desc: "Promoting excellence in computing." },
    { title: "Hackathons", emoji: "⌨️", desc: "24-hour coding marathons for real-world fixes." },
  ],
  Research: [
    { title: "E-Cell", emoji: "💡", desc: "Nurturing the next generation of entrepreneurs." },
    { title: "IIIC", emoji: "🏢", desc: "Industry-Institute Interaction Cell." },
    { title: "IGBC", emoji: "🌿", desc: "Green building and sustainability initiatives." },
  ]
};

const NOTICES = [
  { title: "Cut Off Lists FE/DSE/ME/MMS 25-26", date: "Mar 15, 2026", isNew: true },
  { title: "IC3ET IEEE Conference Schedule", date: "Mar 10, 2026", isNew: true },
  { title: "Admission Enquiry Forms 2026-27", date: "Feb 28, 2026", isNew: false },
  { title: "Scholarship Applications Open", date: "Feb 20, 2026", isNew: false },
];

const EVENTS = [
  { title: "VNPS 2026", date: "Apr 1", type: "Technical" },
  { title: "IC3ET IEEE", date: "Feb 9", type: "Conference" },
  { title: "ZEAL 2026", date: "Jan 16", type: "Cultural" },
  { title: "HPC FDP", date: "Mar 1", type: "Faculty" },
  { title: "OSCILLATIONS", date: "Apr 1", type: "Technical" },
];

const TESTIMONIALS = [
  { name: "Vinit Kanvinde", role: "Network Engineer", company: "Google", initial: "VK" },
  { name: "Dr. Amrita M A", role: "Manager", company: "I-Nurture Solutions", initial: "AM" },
  { name: "Amit Verma", role: "Product Manager", company: "BillDesk", initial: "AV" },
  { name: "Anish Patki", role: "General Manager", company: "Marketing", initial: "AP" },
];

// --- Sub-Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-cyan-400 font-medium uppercase tracking-widest text-sm"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mt-6 rounded-full" />
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Departments", href: "#departments" },
    { name: "Admissions", href: "#admissions" },
    { name: "Research", href: "#research" },
    { name: "Placements", href: "#placements" },
    { name: "Campus Life", href: "#campus" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0f1e]/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-blue-500 tracking-tighter leading-none">VCET</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Est. 1994</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
            Apply Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0f1e] z-40 lg:hidden flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-full">
              Apply Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const phrases = ["Engineer the Future.", "Innovate Without Limits.", "Where Ideas Become Impact."];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setDisplayText(currentPhrase.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e] pt-20">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter min-h-[1.2em]">
            {displayText}<span className="animate-pulse text-blue-500">|</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            NBA & NAAC Accredited | Autonomous Institute | Affiliated to University of Mumbai | AICTE Approved
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg">
              Explore Programs
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-bold rounded-xl transition-all">
              Virtual Tour
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "8 Departments", icon: "🏢" },
              { label: "3000+ Students", icon: "👨‍🎓" },
              { label: "500+ Placements/yr", icon: "💼" },
              { label: "30+ Years", icon: "⏳" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center justify-center gap-3"
              >
                <span className="text-xl">{stat.icon}</span>
                <span className="text-sm font-bold text-gray-200">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MarqueeStats = () => {
  const stats = [
    "NBA Accredited", "NAAC Accredited", "30+ Years of Excellence", 
    "8 Specialized Departments", "500+ Top Recruiters", 
    "₹1.06 Crore Highest Package", "Autonomous Institute"
  ];

  return (
    <div className="bg-blue-600/10 border-y border-blue-500/20 py-4 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center mx-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 shadow-[0_0_10px_#06b6d4]" />
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">{stat}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

const Departments = () => {
  return (
    <section id="departments" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Academic Excellence">World-Class Programs</SectionHeading>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-bl-full -mr-12 -mt-12 group-hover:bg-blue-600/20 transition-all" />
              <div className="text-4xl mb-6">{dept.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{dept.name}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{dept.tagline}</p>
              <a href="#" className="inline-flex items-center text-blue-400 font-bold text-sm group-hover:text-cyan-400 transition-colors">
                Explore <ChevronRight size={16} className="ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Placements = () => {
  const maxVal = Math.max(...PLACEMENT_DATA.map(d => d.count));
  
  return (
    <section id="placements" className="py-24 bg-[#0a0f1e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading subtitle="Career Outcomes">Career Outcomes That Speak</SectionHeading>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] mb-16">
          <div className="flex items-end justify-between gap-2 md:gap-4 h-[300px]">
            {PLACEMENT_DATA.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex flex-col items-center justify-end h-[250px]">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(data.count / maxVal) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg relative group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-bold text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.count}
                    </div>
                  </motion.div>
                </div>
                <span className="mt-4 text-gray-500 font-bold text-[10px] uppercase tracking-tighter">{data.year}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm font-medium">Yearly Placement Statistics (Number of Students)</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { label: "500+ Companies", icon: <Briefcase className="text-blue-500" /> },
            { label: "₹1.06 Cr Highest Package", icon: <Zap className="text-cyan-400" /> },
            { label: "90%+ Placement Rate", icon: <GraduationCap className="text-blue-500" /> }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="p-3 bg-white/5 rounded-xl">{item.icon}</div>
              <span className="text-xl font-bold text-white">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="overflow-hidden whitespace-nowrap py-8 border-t border-white/5">
          <div className="flex animate-marquee-slow items-center">
            {[...RECRUITERS, ...RECRUITERS].map((logo, i) => (
              <span key={i} className="mx-12 text-2xl font-black text-gray-600 hover:text-blue-500 transition-colors cursor-default uppercase tracking-tighter">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

const Achievements = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Remarkable Achievements</h2>
            <p className="text-cyan-400 font-medium uppercase tracking-widest text-sm">Excellence in Action</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-blue-600 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-blue-600 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory"
        >
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={i}
              className="min-w-[280px] md:min-w-[400px] snap-start bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md border border-white/10 p-8 rounded-[2rem] relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="inline-block px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6">
                {ach.badge}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">{ach.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{ach.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                <Award size={14} /> {ach.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

const CampusLife = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof CAMPUS_LIFE>('Sports');

  return (
    <section id="campus" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Student Experience">Life Beyond the Classroom</SectionHeading>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(CAMPUS_LIFE).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as keyof typeof CAMPUS_LIFE)}
              className={`px-6 md:px-8 py-3 rounded-full font-bold text-sm transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CAMPUS_LIFE[activeTab].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const NoticesEvents = () => {
  return (
    <section className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Notices */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Bell className="text-blue-500" />
            <h2 className="text-3xl font-bold text-white">Latest Notices</h2>
          </div>
          <div className="space-y-4">
            {NOTICES.map((notice, i) => (
              <div key={i} className="bg-white/5 border-l-4 border-blue-600 p-5 rounded-r-xl hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors">{notice.title}</h3>
                  {notice.isNew && <span className="bg-cyan-500 text-[10px] font-black text-white px-2 py-0.5 rounded-full animate-pulse">NEW</span>}
                </div>
                <p className="text-gray-500 text-xs font-medium">{notice.date}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 text-blue-400 font-bold text-sm flex items-center hover:text-cyan-400 transition-colors">
            View All Notices <ChevronRight size={16} className="ml-1" />
          </button>
        </div>

        {/* Events */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
          </div>
          <div className="space-y-4">
            {EVENTS.map((event, i) => (
              <div key={i} className="flex items-center gap-6 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                <div className="flex flex-col items-center justify-center min-w-[70px] h-[70px] bg-cyan-600/20 rounded-xl border border-cyan-500/20">
                  <span className="text-cyan-400 font-black text-xl leading-none">{event.date.split(' ')[1]}</span>
                  <span className="text-cyan-400/60 font-bold text-[10px] uppercase">{event.date.split(' ')[0]}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{event.title}</h3>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{event.type}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-cyan-400 font-bold text-sm flex items-center hover:text-blue-400 transition-colors">
            Full Event Calendar <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#0a0f1e] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionHeading subtitle="Our Legacy">Alumni Who Inspire</SectionHeading>
        
        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[3rem] relative w-full"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-serif">
                "
              </div>
              <p className="text-lg md:text-2xl text-gray-300 italic mb-10 leading-relaxed">
                VCET provided the perfect launchpad for my career. The technical rigor and the vibrant campus culture prepared me for the challenges of the global tech industry.
              </p>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg">
                  {TESTIMONIALS[index].initial}
                </div>
                <h4 className="text-white font-bold text-lg">{TESTIMONIALS[index].name}</h4>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                  <span className="text-gray-500 text-sm">{TESTIMONIALS[index].role}</span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full hidden sm:block" />
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">{TESTIMONIALS[index].company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${index === i ? 'bg-blue-500 w-8' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const QuickLinks = () => {
  const links = [
    { title: "ERP Portal", sub: "erp.vcet.edu.in", icon: <Globe />, color: "from-blue-600/20 to-blue-900/20" },
    { title: "Alumni Portal", sub: "alumni.vcet.edu.in", icon: <Users />, color: "from-cyan-600/20 to-cyan-900/20" },
    { title: "Admission 2026-27", sub: "Apply via Google Form", icon: <GraduationCap />, color: "from-indigo-600/20 to-indigo-900/20" },
  ];

  return (
    <section className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {links.map((link, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className={`relative p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br ${link.color} group overflow-hidden cursor-pointer`}
          >
            <div className="absolute top-0 right-0 p-6 text-white/10 group-hover:text-white/20 transition-colors">
              {link.icon}
            </div>
            <div className="p-4 bg-white/10 rounded-2xl w-fit mb-6 text-white">
              {link.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{link.title}</h3>
            <p className="text-gray-400 text-sm mb-8">{link.sub}</p>
            <button className="flex items-center gap-2 text-white font-bold text-sm bg-white/10 px-6 py-3 rounded-xl group-hover:bg-white/20 transition-all">
              Access Now <ChevronRight size={18} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#050811] pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex flex-col mb-6">
              <span className="text-3xl font-black text-blue-500 tracking-tighter leading-none">VCET</span>
              <span className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">Est. 1994</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Vidyavardhini's College of Engineering & Technology is committed to providing world-class technical education and fostering innovation in the heart of Vasai.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-white/10 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Departments</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              {DEPARTMENTS.slice(0, 5).map((dept, i) => (
                <li key={i} className="hover:text-blue-400 transition-colors cursor-pointer">{dept.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              {["About Us", "Admissions", "Research", "Placements", "Campus Life", "Privacy Policy"].map((link, i) => (
                <li key={i} className="hover:text-blue-400 transition-colors cursor-pointer">{link}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-6 text-gray-400 text-sm">
              <li className="flex gap-4">
                <MapPin className="text-blue-500 shrink-0" size={20} />
                <span>K.T. Marg, Vartak College Campus, Vasai Road (W), Dist-Palghar, Maharashtra 401202</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-blue-500 shrink-0" size={20} />
                <span>+91 7972019446 | 0250 233 8234</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-blue-500 shrink-0" size={20} />
                <span>vcet_inbox@vcet.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
          <span>© 2025 VCET All Rights Reserved</span>
          <div className="flex gap-6">
            <span>NBA Accredited</span>
            <span>NAAC Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="bg-[#0a0f1e] min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <MarqueeStats />
        
        <section id="about" className="py-24 bg-[#0a0f1e]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading subtitle="Who We Are">Legacy of Innovation</SectionHeading>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Founded in 1994, Vidyavardhini's College of Engineering & Technology (VCET) has stood as a beacon of technical excellence for over three decades. As an autonomous institute affiliated with the University of Mumbai, we blend academic rigor with industry-focused innovation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="text-3xl font-black text-blue-500 mb-1">30+</h4>
                  <p className="text-gray-500 text-xs font-bold uppercase">Years of Legacy</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="text-3xl font-black text-cyan-400 mb-1">A+</h4>
                  <p className="text-gray-500 text-xs font-bold uppercase">NAAC Grade</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
              <div className="relative aspect-video bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                <div className="z-10 text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                    <Zap className="text-white fill-white" size={32} />
                  </div>
                  <h3 className="text-white font-bold text-xl">Watch Virtual Tour</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Departments />
        <Placements />
        <Achievements />
        <CampusLife />
        <NoticesEvents />
        <Testimonials />
        <QuickLinks />
      </main>

      <Footer />

      {/* Global Styles for smooth scroll and custom scrollbar */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body::-webkit-scrollbar {
          width: 10px;
        }
        body::-webkit-scrollbar-track {
          background: #0a0f1e;
        }
        body::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
          border: 3px solid #0a0f1e;
        }
        body::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}
