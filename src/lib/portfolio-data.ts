export type PortfolioData = {
  about?: string;
  experience?: {
    title?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  projects?: {
    name?: string;
    technologies?: string[] | string;
    description?: string;
  }[];
  skills?: string[];
  education?: {
    institution?: string;
    degree?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  zenithChat: {
    name: string;
    features: string[];
    techStack: string[];
  };
  messageCraftAI: {
    name: string;
    features: string[];
    techStack: string[];
  };
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
};

export const portfolioData: PortfolioData = {
  name: 'Shilpa Sinha',
  email: 'shilpa.sinha3107@gmail.com',
  phone: '+91 76328 45447',
  github: 'shilpa3107',
  linkedin: 'shilpa31',
  leetcode: 'Shilpa3107',
  about: "I am a passionate and dedicated computer science student with a strong foundation in full-stack development, machine learning, and software engineering principles. With hands-on experience in developing web applications and a knack for problem-solving, I thrive in collaborative environments and am eager to contribute to innovative projects. I am constantly seeking to expand my skills and take on new challenges in the tech industry.",
  experience: [
    {
      title: 'Fullstack Developer Intern',
      company: 'BigBul',
      location: 'Remote, India',
      startDate: 'Jun 2025',
      endDate: 'Ongoing',
      description: 'Designed and developed a full-stack course registration platform using Python, Angular, Typescript, MySQL and leaflet, enabling real-time OTP-based user authentication.',
    },
    {
      title: 'Cyber Security (Virtual Internship)',
      company: 'Cisco',
      location: 'Remote',
      startDate: 'Jul 2025',
      endDate: 'Sep 2025',
      description: 'Audited and analyzed college network security, identifying vulnerabilities and suggesting countermeasures. Designed secure hybrid access for remote faculty and implemented smart web access policies for students. Delivered network diagrams, technical documentation, and risk-based recommendations.',
    },
    {
      title: 'Software Developer Intern',
      company: 'Workzen',
      location: 'Remote, India',
      startDate: 'Jun 2025',
      endDate: 'Jul 2025',
      description: 'Developed and optimized backend services using Python and Node.js, improving system performance by 30%. Implemented RESTful APIs for user authentication and data management, reducing response time by 40%. Collaborated with the team to design and deploy scalable cloud infrastructure on AWS. Conducted code reviews and contributed to improving code quality and best practices.',
    },
    {
      title: 'WebDevelopment Intern',
      company: 'Amibba Systems Private Limited',
      location: 'Remote, India',
      startDate: 'Jun 2023',
      endDate: 'Sept 2023',
      description: 'Built a system design tutorial website using AngularJS, CSS, and HTML, enhancing navigation efficiency by 40%. Implemented secure authentication with Ionic Angular and Firebase, supporting 100+ users. Reduced content management time by 25% through structured JSON implementation.',
    },
  ],
  projects: [
    {
      name: 'Real-Time Hospital Bed Availability System',
      technologies: ['React.js', 'Tailwind CSS', 'Firebase', 'Google Maps API'],
      description: 'Developed a platform to locate nearby hospitals with real-time bed availability, improving emergency response time by 30% through geolocation services and Firebase integration. Implemented secure hospital login and admin dashboard, enabling 50+ hospitals to update bed status in real-time.',
    },
    {
      name: 'Emotion Detection System',
      technologies: ['Python', 'OpenCV', 'Scikit-learn', 'Tkinter'],
      description: 'Built a real-time emotion recognition system with 85% accuracy using scikit-learn, processing 48x48 grayscale facial images. Enhanced prediction responsiveness by 30% through optimized image preprocessing and integrated into a Tkinter GUI.',
    },
    {
      name: 'College Research Submission System',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
      description: 'Created a secure research submission portal with user authentication, handling submissions from 50+ faculty members. Reduced form errors by 30% through robust input validation and improved data security measures.',
    },
    {
        name: 'Speech-Segmentation',
        technologies: ['Python', 'pydub', 'numpy', 'matplotlib'],
        description: 'Processes an audio file to detect and segment speech from silence, exporting the speech portions as individual audio clips. Includes optional waveform visualization.'
    },
    {
        name: 'PrivacyShield',
        technologies: ['Python', 'Streamlit', 'pandas', 'nltk', 'androguard'],
        description: 'An app security and privacy analyzer for Android APKs. It assesses permissions, detects potential malware, and analyzes privacy policies to generate a risk score.'
    },
    {
        name: 'TaskTrackerPro',
        technologies: ['React', 'TypeScript', 'Redux', 'MUI', 'Express.js'],
        description: 'A Kanban board application for managing tasks through different stages. Features drag-and-drop functionality and a search bar to filter tasks.'
    },
    {
      name: 'brain_tumor_detection',
      technologies: ['MATLAB'],
      description: 'Processes medical images to identify and highlight tumor regions using advanced image processing techniques, aiding in early diagnosis.'
    },
    {
      name: 'bmi-calculator',
      technologies: ['Java', 'XML'],
      description: 'A simple mobile app that calculates Body Mass Index (BMI) based on user input for weight and height, providing a quick health assessment.'
    },
    {
      name: 'netflix_clone',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      description: 'A web application that mimics the Netflix user interface and features, including an interactive FAQ section with accordions.'
    },
  ],
  skills: [
    "Languages: Python, Java, JavaScript, C, HTML5, CSS, SQL, TypeScript, PHP",
    "Frameworks: React.js, Angular, Ionic, Node.js, Flask, Django",
    "Tools: Git, GitHub, VS Code, Firebase, AWS, XAMPP, Cisco Packet Tracer, Network Topology Mapping",
    "Concepts: OOP, Data Structures, Algorithms, SDLC, Agile, Machine Learning",
    "Soft Skills: Problem Solving, Communication, Teamwork, Time Management, Adaptability"
  ],
  education: [
    {
      institution: 'Amity University, Patna, Bihar',
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      startDate: 'Oct 2022',
      endDate: 'May 2026',
      description: 'CGPA: 9.39/10.0',
    },
    {
      institution: 'Carmel High School, Patna, Bihar',
      degree: '12th Grade (PCM)',
      startDate: 'Apr 2019',
      endDate: 'Jul 2021',
      description: 'Percentage: 89.2%',
    },
  ],
  zenithChat: {
    name: 'Zenith Chat',
    features: [
      'Empathetic AI Chatbot',
      'Mood Detection',
      'Personalized Relaxation Tips',
      'Modern & Responsive UI',
      'Secure & Private',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'ShadCN UI',
      'Genkit',
      'Google Gemini',
    ],
  },
  messageCraftAI: {
    name: 'MessageCraft AI',
    features: [
      'AI-Powered Message Generation',
      'Prompt Improvement',
      'Easy to Use',
    ],
    techStack: ['Next.js', 'Genkit', 'Google Gemini', 'ShadCN UI'],
  },
};
