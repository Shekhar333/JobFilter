# JobFilter - Candidate Hiring Assistant

A powerful, modern web application built with Next.js 14 to help startups filter and select the best candidates from hundreds of job applications. Upload your own candidate data and efficiently review and shortlist candidates for your fast-growing startup.

## 🌐 Live Demo

**🚀 [Try JobFilter Now](https://job-filter-git-main-shivam-shekhars-projects-909dbed1.vercel.app)**

## 🚀 Features

### 🎯 Core Functionality

#### 📁 **Smart File Upload & Validation**

- **Drag & Drop Interface**: Intuitive file upload with visual feedback and progress indicators
- **Real-time Data Validation**: Comprehensive validation with detailed error reporting and suggestions
- **Format Flexibility**: Handles JSON files with intelligent error recovery for malformed data
- **Sample Data Integration**: Built-in sample files for testing and format reference

#### 📊 **Advanced Candidate Management**

- **Interactive Data Table**: Built with TanStack Table featuring sorting, pagination, and column filtering
- **Smart Search**: Global search across names, emails, companies, skills, and experience
- **Candidate Scoring**: Algorithmic scoring system based on education, experience, and skills (0-100 scale)
- **Team Selection**: Select up to 5 candidates with real-time validation and duplicate prevention

#### 🔍 **Powerful Filtering System**

- **Multi-dimensional Filters**: Filter by location, skills, education level, experience, salary range
- **Dynamic Filter Options**: Auto-populated filter options based on uploaded data
- **Searchable Filter Lists**: Search within filter categories for large datasets
- **Advanced Salary Filtering**: Range-based salary filtering with currency formatting

#### 📋 **Detailed Candidate Profiles**

- **Comprehensive Modal Views**: Full candidate details with organized sections
- **Experience Timeline**: Structured work experience with company and role information
- **Education Details**: Degree information, GPA ranges, and school prestige indicators
- **Skills Assessment**: Visual skill representation with categorization

#### 📈 **Analytics & Insights Dashboard**

- **Team Composition Analytics**: Diversity metrics and team balance insights
- **Score Distribution**: Statistical analysis of selected candidates' scores
- **Geographic Distribution**: Location-based team distribution visualization
- **Skill Coverage**: Comprehensive skill set analysis for the selected team

### 💻 **Technical Excellence**

#### 🏗️ **Modern Architecture**

- **Next.js 14 App Router**: Latest features with server and client components optimization
- **TypeScript**: 100% type-safe codebase with comprehensive interfaces and type definitions
- **React 18**: Modern React patterns with hooks, suspense, and concurrent features
- **TailwindCSS**: Utility-first CSS framework with custom design system

#### 🎨 **UI/UX Framework**

- **Shadcn/UI Components**: Consistent, accessible component library with customizable themes
- **Lucide React Icons**: Comprehensive icon set with consistent styling
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Mode Ready**: Theme-aware component architecture

#### 📊 **Data Management**

- **TanStack Table**: Advanced table functionality with sorting, filtering, and pagination
- **React Dropzone**: Professional file upload with drag & drop capabilities
- **Custom React Hooks**: Modular state management (useCandidates, useFilters, useFileUpload)
- **Client-side Storage**: Efficient local data management and caching

#### 🔧 **Development & Build**

- **ESLint & TypeScript**: Code quality and consistency enforcement
- **Tailwind Config**: Custom design tokens and utility classes
- **PostCSS**: Advanced CSS processing and optimization
- **Vercel Deployment**: Optimized production builds and edge functions

### 🎨 **User Experience & Design**

#### 📱 **Cross-Platform Excellence**

- **Fully Responsive**: Seamless experience across desktop, tablet, and mobile devices
- **Progressive Web App Ready**: Fast loading and smooth interactions
- **Accessibility First**: WCAG 2.1 compliant with screen reader support and keyboard navigation
- **Performance Optimized**: Sub-second loading times with efficient bundle splitting

#### 🎯 **Intuitive Interface Design**

- **Modern Minimalist UI**: Clean design language with purposeful use of whitespace
- **Visual Hierarchy**: Clear information architecture guiding user attention
- **Micro-interactions**: Smooth animations and feedback for user actions
- **Consistent Patterns**: Unified design system across all components

#### ⚡ **Performance & Reliability**

- **Real-time Updates**: Instant feedback for all user interactions
- **Optimistic UI**: Immediate response with graceful error handling
- **Efficient Data Processing**: Client-side computation for instant filtering and sorting
- **Memory Management**: Optimized handling of large candidate datasets

## 🏗️ **Project Architecture**

### 📁 **Directory Structure**

```
JobFilter/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # Backend API routes
│   │   └── candidates/           # Candidate management endpoints
│   │       ├── route.ts          # Main candidate operations
│   │       └── upload/           # File upload handling
│   │           └── route.ts
│   ├── globals.css               # Global styles & Tailwind imports
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main application entry point
│
├── components/                   # Reusable React components
│   ├── candidates/               # Candidate management components
│   │   ├── CandidateDetailsModal.tsx    # Detailed candidate view
│   │   ├── CandidatesTable.tsx          # Main data table with TanStack
│   │   └── FilterPanel.tsx              # Advanced filtering interface
│   ├── dashboard/                # Analytics and dashboard components
│   │   └── SelectedCandidatesDashboard.tsx # Team analytics view
│   ├── upload/                   # File upload functionality
│   │   └── FileUploadDropzone.tsx       # Drag & drop file upload
│   └── ui/                       # Shadcn/UI base components
│       ├── alert.tsx, badge.tsx, button.tsx
│       ├── card.tsx, checkbox.tsx, dialog.tsx
│       ├── input.tsx, select.tsx, tabs.tsx
│       └── [Additional UI components]
│
├── hooks/                        # Custom React hooks for state management
│   ├── useCandidates.ts         # Candidate data management
│   ├── useFileUpload.ts         # File upload state and validation
│   └── useFilters.ts            # Advanced filtering logic
│
├── lib/                          # Utility functions and configurations
│   ├── candidateStorage.ts      # Local storage management
│   └── utils.ts                 # Helper functions and utilities
│
├── types/                        # TypeScript type definitions
│   └── candidate.ts             # Candidate and filter interfaces
│
├── data/                         # Static data and samples
│   └── candidates.ts            # Default candidate data
│
└── public/                       # Static assets and sample files
    ├── sample-candidates.json           # Perfect format example
    └── sample-candidates-with-issues.json # Error handling demo
```

### 🏛️ **Component Design Patterns**

#### 🧩 **Modular Architecture**

- **Single Responsibility**: Each component has a focused, well-defined purpose
- **Compound Components**: Complex features built from smaller, composable parts
- **Custom Hooks**: Business logic abstracted into reusable hooks (useCandidates, useFilters)
- **Prop-based Communication**: Clean data flow without prop drilling or global state

#### 🎨 **Design System Integration**

- **Shadcn/UI Foundation**: Consistent component library with theme variants
- **TypeScript Interfaces**: Strongly typed props and state management
- **Accessibility Built-in**: ARIA labels, focus management, and keyboard navigation
- **Responsive by Default**: Mobile-first component design with breakpoint awareness

#### 🔧 **State Management Strategy**

- **Local State**: React useState and useReducer for component-specific state
- **Shared State**: Custom hooks for cross-component data sharing
- **Client Storage**: LocalStorage integration for data persistence
- **Form Handling**: Controlled components with validation and error states

## 🎯 Key Problem Solved

**Challenge**: A startup with $100M in funding needs to quickly hire the best talent from hundreds of applications, but manual review is time-consuming and prone to bias.

**Solution**: JobFilter provides:

1. **Easy Data Import**: Upload your candidate data via drag & drop interface
2. **Efficient Filtering**: Quickly narrow down candidates based on multiple criteria
3. **Data-Driven Scoring**: Algorithmic scoring based on education, experience, and skills
4. **Comparative Analysis**: Side-by-side comparison of candidates
5. **Team Analytics**: Understanding the composition and diversity of the selected team
6. **Streamlined Process**: From 100+ candidates to 5 finalists in minutes

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd JobFilter

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Using Your Own Data

1. **Prepare Your Data**: Create a JSON file with your candidate data
2. **Upload**: Use the drag & drop interface to upload your JSON file
3. **Validate**: The system will validate your data format and show any errors
4. **Filter**: Start filtering and selecting your ideal candidates

#### Data Format Requirements

Your JSON file should contain an array of candidate objects with the following structure:

```json
[
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "location": "New York",
    "submitted_at": "2025-01-28 09:00:00.000000",
    "work_availability": ["full-time"],
    "annual_salary_expectation": {
      "full-time": "$120000"
    },
    "work_experiences": [
      {
        "company": "Tech Corp",
        "roleName": "Software Engineer"
      }
    ],
    "education": {
      "highest_level": "Bachelor's Degree",
      "degrees": [
        {
          "degree": "Bachelor's Degree",
          "subject": "Computer Science",
          "school": "State University",
          "gpa": "GPA 3.5-3.9",
          "startDate": "2016",
          "endDate": "2020",
          "originalSchool": "State University",
          "isTop50": false
        }
      ]
    },
    "skills": ["JavaScript", "React", "Node.js"]
  }
]
```

**Required Fields:**

- `name`, `email`, `location`, `work_availability`, `work_experiences`, `education`, `skills`

#### Sample Data

Download the sample candidate data file from `/public/sample-candidates.json` to see the exact format expected.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checking
```

## 📊 Scoring Algorithm

The application uses a sophisticated scoring system to rank candidates:

### Score Components (Total: 100 points)

- **Education (30 points max)**:

  - High School: 10 points
  - Associate's: 15 points
  - Bachelor's: 20 points
  - Master's: 25 points
  - Doctorate: 30 points
  - Top 50 School Bonus: +5 points

- **Experience (35 points max)**:

  - 5 points per role (capped at 35)
  - Quality weighted by company reputation

- **Skills (30 points max)**:

  - 3 points per skill (capped at 30)
  - Bonus for in-demand technical skills

- **Additional Factors (5 points max)**:
  - Geographic diversity
  - Unique background combinations

## 🎨 Design Philosophy

### User Experience Principles

1. **Clarity First**: Information hierarchy that guides the user's attention
2. **Efficiency**: Minimize clicks and cognitive load
3. **Feedback**: Clear visual feedback for all user actions
4. **Consistency**: Consistent patterns and interactions throughout
5. **Accessibility**: Usable by everyone, including users with disabilities

### Visual Design

- **Modern Interface**: Clean, minimalist design with purposeful use of space
- **Color Psychology**: Strategic use of color to convey meaning (green for selected, red for warnings)
- **Typography**: Clear hierarchy using Inter font for optimal readability
- **Responsive Grid**: Flexible layout that works on all device sizes

## 🔧 File Upload Features

### Supported Formats

- **JSON files only** (`.json`)
- **Maximum file size**: 10MB
- **Drag & drop interface** with visual feedback
- **Real-time validation** with detailed error messages

### Data Validation

- **Structure validation**: Ensures your data follows the expected format
- **Required field checking**: Validates all necessary fields are present
- **Type validation**: Checks data types match expected format
- **Error reporting**: Detailed feedback on what needs to be fixed

### Sample File Generator

- **Download sample**: Click to download a properly formatted sample file
- **Format guide**: Built-in documentation showing required structure
- **Error guidance**: Specific messages to help fix data issues

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Google Cloud Platform
- Self-hosted with Docker

## 🤝 Contributing

### Code Style

- TypeScript for all new code
- ESLint + Prettier for code formatting
- Conventional commits for git messages
- Component-driven development

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Update documentation
5. Submit pull request with clear description

## 📈 Future Enhancements

### Planned Features

- **Multiple File Formats**: Support for CSV, Excel files
- **Batch Operations**: Select and process multiple candidates at once
- **Export Features**: Download filtered results and analytics
- **AI-Powered Matching**: Machine learning for better candidate-role fit
- **Video Interview Integration**: Built-in video calling for interviews
- **Collaborative Hiring**: Multi-user support with different permission levels
- **Integration APIs**: Connect with ATS systems and job boards
- **Advanced Analytics**: Hiring pipeline metrics and bias detection

### Technical Improvements

- **Performance**: Virtual scrolling for large datasets
- **Offline Support**: Progressive Web App capabilities
- **Real-time**: WebSocket updates for collaborative features
- **Testing**: Comprehensive test suite with Cypress and Jest
- **Monitoring**: Error tracking and performance monitoring

## 🔐 Data Security

- **Client-side processing**: Your data never leaves your browser during validation
- **Temporary storage**: Data is only stored in memory during the session
- **No persistence**: Data is cleared when you close the browser
- **Privacy first**: No tracking or analytics on uploaded data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **TanStack Table** for the powerful data table functionality
- **Shadcn/ui** for the beautiful component library
- **React Dropzone** for seamless file upload experience
- **Lucide React** for the comprehensive icon set
- **Next.js Team** for the excellent framework
- **Vercel** for seamless deployment platform

---

Built with ❤️ for modern hiring teams who value efficiency, data-driven decisions, and candidate experience.

## 🎮 **Complete User Guide**

### 🚀 **Getting Started**

#### **Option 1: Use the Live Demo** (Recommended)

1. **Visit**: [https://job-filter-git-main-shivam-shekhars-projects-909dbed1.vercel.app](https://job-filter-git-main-shivam-shekhars-projects-909dbed1.vercel.app)
2. **Instant Access**: No installation required - start filtering candidates immediately!

#### **Option 2: Local Development**

1. **Start the Application**: Navigate to `http://localhost:3000` after running `npm run dev`

### 📋 **Step-by-Step Workflow**

#### **1. 📁 Data Upload & Validation**

- **First Visit**: You'll see the intuitive upload interface with drag & drop zone
- **Upload Options**:
  - Drag & drop your JSON file directly onto the upload area
  - Click "Browse Files" to select from your computer
  - Use "Download Sample File" button to get the perfect format template
- **Validation Process**: Real-time validation with detailed error messages and fix suggestions
- **Error Handling**: Invalid entries are flagged with specific guidance on corrections needed

#### **2. 🔍 Advanced Filtering**

- **Filter Panel**: Expandable sidebar with 8+ filter categories
  - **Location**: Filter by city, state, or country
  - **Skills**: Multi-select from available skills (with search)
  - **Education**: Filter by degree level (High School → Doctorate)
  - **Experience**: Filter by company names and role types
  - **Salary Range**: Slider-based salary filtering with currency formatting
  - **Work Availability**: Full-time, part-time, contract options
- **Search Everything**: Global search across names, emails, companies, and skills
- **Filter Combinations**: Apply multiple filters simultaneously for precise results

#### **3. 📊 Candidate Review & Selection**

- **Smart Table**: Sortable columns with candidate scoring (0-100 scale)
- **Candidate Actions**:
  - 👁️ **View Details**: Comprehensive modal with full candidate profile
  - ✅ **Select Candidate**: Add to your shortlist (maximum 5 candidates)
  - 📋 **Quick Info**: Essential details visible in table rows
- **Selection Management**: Real-time validation prevents over-selection
- **Candidate Scoring**: Algorithmic scoring based on education, experience, and skills

#### **4. 📈 Team Analytics Dashboard**

- **Switch Tabs**: Navigate to "Selected Team" to view analytics
- **Team Insights**:
  - 📊 **Score Distribution**: Average, highest, and lowest scores
  - 🌍 **Geographic Diversity**: Location spread of selected team
  - 🎓 **Education Breakdown**: Education level distribution
  - 💼 **Experience Analysis**: Role diversity and company background
  - 🛠️ **Skill Coverage**: Comprehensive skill set analysis
- **Team Actions**: Remove candidates or clear entire selection

#### **5. 🔄 Data Management**

- **Upload New Data**: Replace current dataset with new candidate file
- **Reset Filters**: Clear all applied filters to see full dataset
- **Persistent State**: Your selections persist during the session

Perfect for recruitment teams, HR professionals, and hiring managers! 🎯

---

## 🎯 **Quick Demo Highlights**

### ✨ **Key Features to Try**

- **📊 Upload the sample data** to see 50+ diverse candidates instantly
- **🔍 Test the advanced filters** - try filtering by "San Francisco" + "React" skills
- **👥 Select your dream team** of 5 candidates and see the analytics dashboard
- **📋 Open candidate details** to see the comprehensive profile views
- **🚀 Experience the speed** - all filtering and searching happens instantly

### 🏆 **Perfect For:**

- **Recruiting Teams**: Streamline your candidate review process
- **HR Professionals**: Make data-driven hiring decisions
- **Startup Founders**: Quickly assemble your ideal team
- **Technical Interviews**: Demonstrate modern web development skills

Built with ❤️ for modern hiring teams who value efficiency and candidate experience.
