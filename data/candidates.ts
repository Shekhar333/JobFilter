import { Candidate } from "@/types/candidate";

export const mockCandidates: Omit<Candidate, "id">[] = [
  {
    name: "Clever Monkey",
    email: "clever-monkey@example.com",
    phone: "5582981474204",
    location: "Maceió",
    submitted_at: "2025-01-28 09:02:16.000000",
    work_availability: ["full-time", "part-time"],
    annual_salary_expectation: {
      "full-time": "$117548",
    },
    work_experiences: [
      {
        company: "StarLab Digital Ventures",
        roleName: "Full Stack Developer",
      },
      {
        company: "OrbitalLife",
        roleName: "Project Manager",
      },
      {
        company: "Carrot Hosting",
        roleName: "Full Stack Developer",
      },
      {
        company: "Bitbay Solutions",
        roleName: "Full Stack Developer",
      },
      {
        company:
          "Federal Institute of Science, Education & Technology - Alagoas",
        roleName: "Project Manager",
      },
      {
        company: "Usina Caeté",
        roleName: "Scientist",
      },
      {
        company: "Cyberia",
        roleName: "System Administrator",
      },
    ],
    education: {
      highest_level: "Bachelor's Degree",
      degrees: [
        {
          degree: "Bachelor's Degree",
          subject: "Computer Science",
          school: "International Institutions",
          gpa: "GPA 3.0-3.4",
          startDate: "2023",
          endDate: "2027",
          originalSchool: "Faculdade Descomplica",
          isTop50: false,
        },
        {
          degree: "Bachelor's Degree",
          subject: "Law",
          school: "International Institutions",
          gpa: "GPA 3.0-3.4",
          startDate: "2015",
          endDate: "2023",
          originalSchool: "Federal University of Alagoas",
          isTop50: false,
        },
        {
          degree: "Bachelor's Degree",
          subject: "Chemistry",
          school: "International Institutions",
          gpa: "GPA 3.0-3.4",
          startDate: "2011",
          endDate: "2014",
          originalSchool: "Federal Institute of Alagoas",
          isTop50: false,
        },
      ],
    },
    skills: ["Data Analysis", "Docker", "Microservices"],
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "1234567890",
    location: "San Francisco",
    submitted_at: "2025-01-27 14:30:22.000000",
    work_availability: ["full-time"],
    annual_salary_expectation: {
      "full-time": "$145000",
    },
    work_experiences: [
      {
        company: "Google",
        roleName: "Senior Software Engineer",
      },
      {
        company: "Meta",
        roleName: "Software Engineer",
      },
      {
        company: "Microsoft",
        roleName: "Software Developer",
      },
    ],
    education: {
      highest_level: "Master's Degree",
      degrees: [
        {
          degree: "Master's Degree",
          subject: "Computer Science",
          school: "Stanford University",
          gpa: "GPA 3.8-4.0",
          startDate: "2018",
          endDate: "2020",
          originalSchool: "Stanford University",
          isTop50: true,
        },
        {
          degree: "Bachelor's Degree",
          subject: "Computer Engineering",
          school: "MIT",
          gpa: "GPA 3.5-3.9",
          startDate: "2014",
          endDate: "2018",
          originalSchool: "MIT",
          isTop50: true,
        },
      ],
    },
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Machine Learning",
      "AWS",
    ],
  },
  {
    name: "David Chen",
    email: "david.chen@startup.io",
    phone: "9876543210",
    location: "New York",
    submitted_at: "2025-01-26 11:15:44.000000",
    work_availability: ["full-time", "part-time"],
    annual_salary_expectation: {
      "full-time": "$120000",
      "part-time": "$80000",
    },
    work_experiences: [
      {
        company: "TechStartup Inc",
        roleName: "Lead Frontend Developer",
      },
      {
        company: "Innovation Labs",
        roleName: "UI/UX Designer",
      },
    ],
    education: {
      highest_level: "Bachelor's Degree",
      degrees: [
        {
          degree: "Bachelor's Degree",
          subject: "Design",
          school: "Art Institute",
          gpa: "GPA 3.5-3.9",
          startDate: "2016",
          endDate: "2020",
          originalSchool: "Art Institute of Chicago",
          isTop50: false,
        },
      ],
    },
    skills: ["React", "Vue.js", "Figma", "Adobe Creative Suite", "JavaScript"],
  },
  {
    name: "Maria Rodriguez",
    email: "maria.rodriguez@consulting.com",
    phone: "5555678901",
    location: "Austin",
    submitted_at: "2025-01-25 16:45:33.000000",
    work_availability: ["full-time"],
    annual_salary_expectation: {
      "full-time": "$135000",
    },
    work_experiences: [
      {
        company: "McKinsey & Company",
        roleName: "Senior Consultant",
      },
      {
        company: "BCG",
        roleName: "Business Analyst",
      },
      {
        company: "Goldman Sachs",
        roleName: "Investment Banking Analyst",
      },
    ],
    education: {
      highest_level: "Master's Degree",
      degrees: [
        {
          degree: "Master's Degree",
          subject: "Business Administration",
          school: "Harvard Business School",
          gpa: "GPA 3.8-4.0",
          startDate: "2018",
          endDate: "2020",
          originalSchool: "Harvard Business School",
          isTop50: true,
        },
        {
          degree: "Bachelor's Degree",
          subject: "Economics",
          school: "University of Pennsylvania",
          gpa: "GPA 3.5-3.9",
          startDate: "2014",
          endDate: "2018",
          originalSchool: "University of Pennsylvania",
          isTop50: true,
        },
      ],
    },
    skills: [
      "Strategic Planning",
      "Data Analysis",
      "Financial Modeling",
      "Leadership",
    ],
  },
  {
    name: "Alex Thompson",
    email: "alex.thompson@devops.com",
    phone: "7778889999",
    location: "Seattle",
    submitted_at: "2025-01-24 13:22:17.000000",
    work_availability: ["full-time"],
    annual_salary_expectation: {
      "full-time": "$155000",
    },
    work_experiences: [
      {
        company: "Amazon",
        roleName: "Senior DevOps Engineer",
      },
      {
        company: "Netflix",
        roleName: "Site Reliability Engineer",
      },
      {
        company: "Docker",
        roleName: "Platform Engineer",
      },
    ],
    education: {
      highest_level: "Bachelor's Degree",
      degrees: [
        {
          degree: "Bachelor's Degree",
          subject: "Computer Science",
          school: "University of Washington",
          gpa: "GPA 3.5-3.9",
          startDate: "2012",
          endDate: "2016",
          originalSchool: "University of Washington",
          isTop50: false,
        },
      ],
    },
    skills: [
      "Kubernetes",
      "AWS",
      "Docker",
      "Terraform",
      "Python",
      "Go",
      "CI/CD",
    ],
  },
  {
    name: "Emily Davis",
    email: "emily.davis@designer.com",
    phone: "1112223333",
    location: "Los Angeles",
    submitted_at: "2025-01-23 10:07:55.000000",
    work_availability: ["part-time"],
    annual_salary_expectation: {
      "part-time": "$70000",
    },
    work_experiences: [
      {
        company: "Apple",
        roleName: "Senior UX Designer",
      },
      {
        company: "Airbnb",
        roleName: "Product Designer",
      },
    ],
    education: {
      highest_level: "Master's Degree",
      degrees: [
        {
          degree: "Master's Degree",
          subject: "Human-Computer Interaction",
          school: "Carnegie Mellon University",
          gpa: "GPA 3.8-4.0",
          startDate: "2017",
          endDate: "2019",
          originalSchool: "Carnegie Mellon University",
          isTop50: true,
        },
        {
          degree: "Bachelor's Degree",
          subject: "Graphic Design",
          school: "RISD",
          gpa: "GPA 3.5-3.9",
          startDate: "2013",
          endDate: "2017",
          originalSchool: "Rhode Island School of Design",
          isTop50: true,
        },
      ],
    },
    skills: [
      "Figma",
      "Sketch",
      "Prototyping",
      "User Research",
      "Design Systems",
    ],
  },
  {
    name: "Michael Brown",
    email: "michael.brown@backend.dev",
    phone: "4445556666",
    location: "Chicago",
    submitted_at: "2025-01-22 08:33:12.000000",
    work_availability: ["full-time"],
    annual_salary_expectation: {
      "full-time": "$140000",
    },
    work_experiences: [
      {
        company: "Uber",
        roleName: "Senior Backend Engineer",
      },
      {
        company: "Stripe",
        roleName: "Software Engineer",
      },
      {
        company: "Shopify",
        roleName: "Backend Developer",
      },
    ],
    education: {
      highest_level: "Bachelor's Degree",
      degrees: [
        {
          degree: "Bachelor's Degree",
          subject: "Software Engineering",
          school: "University of Illinois",
          gpa: "GPA 3.5-3.9",
          startDate: "2015",
          endDate: "2019",
          originalSchool: "University of Illinois at Urbana-Champaign",
          isTop50: false,
        },
      ],
    },
    skills: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Microservices",
    ],
  },
  {
    name: "Jessica Wilson",
    email: "jessica.wilson@mobile.dev",
    phone: "6667778888",
    location: "Miami",
    submitted_at: "2025-01-21 15:18:29.000000",
    work_availability: ["full-time", "part-time"],
    annual_salary_expectation: {
      "full-time": "$125000",
      "part-time": "$75000",
    },
    work_experiences: [
      {
        company: "Instagram",
        roleName: "iOS Developer",
      },
      {
        company: "Snapchat",
        roleName: "Mobile Engineer",
      },
    ],
    education: {
      highest_level: "Bachelor's Degree",
      degrees: [
        {
          degree: "Bachelor's Degree",
          subject: "Computer Science",
          school: "Florida International University",
          gpa: "GPA 3.0-3.4",
          startDate: "2016",
          endDate: "2020",
          originalSchool: "Florida International University",
          isTop50: false,
        },
      ],
    },
    skills: ["Swift", "iOS", "React Native", "Flutter", "Objective-C"],
  },
  {
    name: "Robert Garcia",
    email: "robert.garcia@data.science",
    phone: "9990001111",
    location: "Denver",
    submitted_at: "2025-01-20 12:55:41.000000",
    work_availability: ["full-time"],
    annual_salary_expectation: {
      "full-time": "$165000",
    },
    work_experiences: [
      {
        company: "OpenAI",
        roleName: "Senior Data Scientist",
      },
      {
        company: "Tesla",
        roleName: "Machine Learning Engineer",
      },
      {
        company: "Nvidia",
        roleName: "AI Research Scientist",
      },
    ],
    education: {
      highest_level: "Doctorate",
      degrees: [
        {
          degree: "Doctorate",
          subject: "Machine Learning",
          school: "Stanford University",
          gpa: "GPA 3.8-4.0",
          startDate: "2018",
          endDate: "2022",
          originalSchool: "Stanford University",
          isTop50: true,
        },
        {
          degree: "Master's Degree",
          subject: "Computer Science",
          school: "MIT",
          gpa: "GPA 3.8-4.0",
          startDate: "2016",
          endDate: "2018",
          originalSchool: "MIT",
          isTop50: true,
        },
      ],
    },
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Machine Learning",
      "Deep Learning",
      "Statistics",
    ],
  },
  {
    name: "Lisa Anderson",
    email: "lisa.anderson@product.manager",
    phone: "2223334444",
    location: "Portland",
    submitted_at: "2025-01-19 17:41:03.000000",
    work_availability: ["full-time"],
    annual_salary_expectation: {
      "full-time": "$150000",
    },
    work_experiences: [
      {
        company: "Slack",
        roleName: "Senior Product Manager",
      },
      {
        company: "Dropbox",
        roleName: "Product Manager",
      },
      {
        company: "Zoom",
        roleName: "Associate Product Manager",
      },
    ],
    education: {
      highest_level: "Master's Degree",
      degrees: [
        {
          degree: "Master's Degree",
          subject: "Business Administration",
          school: "UC Berkeley",
          gpa: "GPA 3.5-3.9",
          startDate: "2017",
          endDate: "2019",
          originalSchool: "UC Berkeley Haas School of Business",
          isTop50: true,
        },
        {
          degree: "Bachelor's Degree",
          subject: "Engineering",
          school: "UCLA",
          gpa: "GPA 3.5-3.9",
          startDate: "2013",
          endDate: "2017",
          originalSchool: "UCLA",
          isTop50: true,
        },
      ],
    },
    skills: [
      "Product Strategy",
      "Agile",
      "Data Analysis",
      "User Research",
      "Roadmapping",
    ],
  },
];

// Generate additional candidates programmatically to reach hundreds
export function generateMockCandidates(): Candidate[] {
  const locations = [
    "New York",
    "San Francisco",
    "Los Angeles",
    "Chicago",
    "Austin",
    "Seattle",
    "Boston",
    "Denver",
    "Miami",
    "Portland",
  ];
  const companies = [
    "Google",
    "Meta",
    "Apple",
    "Amazon",
    "Microsoft",
    "Netflix",
    "Uber",
    "Airbnb",
    "Stripe",
    "Shopify",
  ];
  const roles = [
    "Software Engineer",
    "Product Manager",
    "Designer",
    "Data Scientist",
    "DevOps Engineer",
    "Marketing Manager",
  ];
  const skills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "Machine Learning",
    "Data Analysis",
    "Figma",
  ];
  const educationLevels = ["Bachelor's Degree", "Master's Degree", "Doctorate"];
  const subjects = [
    "Computer Science",
    "Engineering",
    "Business",
    "Design",
    "Data Science",
    "Mathematics",
  ];

  const candidates: Candidate[] = [];

  // Add the base mock candidates first
  mockCandidates.forEach((candidate, index) => {
    candidates.push({
      ...candidate,
      id: `candidate-${index + 1}`,
      isSelected: false,
    });
  });

  // Generate additional candidates
  for (let i = mockCandidates.length; i < 50; i++) {
    const name = `Candidate ${i + 1}`;
    const location = locations[Math.floor(Math.random() * locations.length)];
    const numExperiences = Math.floor(Math.random() * 5) + 1;
    const numSkills = Math.floor(Math.random() * 6) + 2;

    const experiences = Array.from({ length: numExperiences }, () => ({
      company: companies[Math.floor(Math.random() * companies.length)],
      roleName: roles[Math.floor(Math.random() * roles.length)],
    }));

    const candidateSkills = Array.from(
      new Set(
        Array.from(
          { length: numSkills },
          () => skills[Math.floor(Math.random() * skills.length)]
        )
      )
    );

    const highestLevel =
      educationLevels[Math.floor(Math.random() * educationLevels.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const isTop50 = Math.random() > 0.7;

    const salary = 80000 + Math.floor(Math.random() * 120000);

    candidates.push({
      id: `candidate-${i + 1}`,
      name,
      email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
      phone: `555${String(Math.floor(Math.random() * 10000000)).padStart(
        7,
        "0"
      )}`,
      location,
      submitted_at: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      work_availability:
        Math.random() > 0.3 ? ["full-time"] : ["full-time", "part-time"],
      annual_salary_expectation: {
        "full-time": `$${salary}`,
      },
      work_experiences: experiences,
      education: {
        highest_level: highestLevel,
        degrees: [
          {
            degree: highestLevel,
            subject,
            school: isTop50 ? "Top University" : "State University",
            gpa: `GPA ${(2.5 + Math.random() * 1.5).toFixed(1)}-${(
              3.0 +
              Math.random() * 1.0
            ).toFixed(1)}`,
            startDate: "2016",
            endDate: "2020",
            originalSchool: isTop50 ? "Top University" : "State University",
            isTop50,
          },
        ],
      },
      skills: candidateSkills,
      isSelected: false,
    });
  }

  return candidates;
}
