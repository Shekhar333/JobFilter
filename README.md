# JobFilter - Candidate Hiring Assistant

A powerful, modern web application built with Next.js to help startups filter and select the best candidates from hundreds of job applications. Upload your own candidate data and efficiently review and shortlist candidates for your fast-growing startup.

## 🚀 Features

### Core Functionality

- **File Upload System**: Drag & drop JSON files with your candidate data
- **Data Validation**: Comprehensive validation to ensure your data format is correct
- **Interactive Candidate Table**: Built with TanStack Table for powerful sorting, filtering, and pagination
- **Advanced Filtering System**: Filter by skills, location, education level, salary range, work availability, and more
- **Smart Search**: Search across names, emails, companies, and skills
- **Candidate Selection**: Select up to 5 candidates for your dream team
- **Detailed Candidate Profiles**: Comprehensive view of each candidate's background, experience, and qualifications
- **Analytics Dashboard**: Insights into your selected team's composition and statistics

### Technical Excellence

- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type safety and better developer experience
- **TailwindCSS** for modern, responsive design
- **Shadcn/ui** components for consistent UI patterns
- **React Dropzone** for intuitive file upload experience
- **Custom Hooks** for state management and reusable logic
- **API Routes** for backend functionality
- **Real-time Updates** with optimistic UI updates

### User Experience

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Intuitive Interface**: Clean, modern design following Material Design principles
- **Fast Performance**: Optimized for speed with efficient data handling
- **Accessibility**: Built with accessibility best practices
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## 🏗️ Architecture

### Frontend Architecture

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application
├── components/            # Reusable components
│   ├── candidates/        # Candidate-specific components
│   ├── dashboard/         # Dashboard components
│   ├── upload/            # File upload components
│   └── ui/                # Base UI components (Shadcn)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

### Component Design Patterns

- **Compound Components**: Complex components broken into smaller, composable parts
- **Custom Hooks**: Business logic separated from UI components
- **Context-Free**: Components receive data through props for better testability
- **Accessibility First**: ARIA labels, keyboard navigation, screen reader support

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

## 🎮 How to Use

1. **Start the Application**: Navigate to `http://localhost:3000`
2. **Upload Your Data**:
   - If no data is loaded, you'll see the upload interface
   - Drag & drop your JSON file or click to browse
   - Use the "Download Sample File" button to get the correct format
3. **Validate Data**: The system will check your data and show any errors
4. **Filter Candidates**: Use the sidebar filters to narrow down candidates
5. **Search**: Use the search bar to find specific candidates
6. **Select Team**: Click the select button to add candidates (max 5)
7. **View Details**: Click the eye icon to see detailed candidate profiles
8. **Analytics**: Switch to the "Selected Team" tab to see team composition
9. **Upload New Data**: Use the "Upload New Data" button to replace current data

Perfect for your assignment demo! 🚀
# JobFilter
