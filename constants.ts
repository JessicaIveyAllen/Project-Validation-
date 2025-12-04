import { MethodItem, TimelinePhase } from './types';

export const VALIDATION_METHODS: MethodItem[] = [
  // Technical Validation
  {
    id: 'poc',
    title: 'Proof of Concept (POC)',
    description: 'A small exercise to test the design idea or assumption.',
    category: 'technical',
    details: [
      'Focuses on technical feasibility.',
      'Not a complete product, just a specific feature test.',
      'Usually thrown away after validation.'
    ]
  },
  {
    id: 'spike',
    title: 'Technical Spike',
    description: 'A time-boxed investigation to learn about a new technology or domain.',
    category: 'technical',
    details: [
      'Used in Agile development.',
      'Reduces technical risk before estimation.',
      'Output is knowledge, not necessarily code.'
    ]
  },
  {
    id: 'prototype',
    title: 'Prototype',
    description: 'An early sample, model, or release of a product built to test a concept.',
    category: 'technical',
    details: [
      'Can be low-fidelity (paper) or high-fidelity (interactive).',
      'Used for user feedback and stakeholder buy-in.',
      'Simulates the look and feel.'
    ]
  },
  
  // Market Validation
  {
    id: 'landing-page',
    title: 'Landing Page Test',
    description: 'A single page measuring interest through sign-ups or clicks.',
    category: 'market',
    details: [
      'Validates value proposition.',
      'Measures willingness to buy/sign up.',
      'Low cost and high speed.'
    ]
  },
  {
    id: 'concierge-mvp',
    title: 'Concierge MVP',
    description: 'Manually providing the service to customers without building the product.',
    category: 'market',
    details: [
      'High touch, low tech.',
      'Validates the problem-solution fit.',
      'Direct interaction with early adopters.'
    ]
  },
  {
    id: 'wizard-of-oz',
    title: 'Wizard of Oz',
    description: 'Looks like a working product on the front-end, but manual on the back-end.',
    category: 'market',
    details: [
      'Users believe the system is automated.',
      'Validates user interaction and demand.',
      'Delay building complex automation.'
    ]
  },

  // Business Validation
  {
    id: 'feasibility',
    title: 'Feasibility Study',
    description: 'Assessment of the practicality of a proposed project or system.',
    category: 'business',
    details: [
      'Analyzes legal, economic, and operational factors.',
      'Determines if the project is worth the investment.',
      'Identifies potential roadblocks.'
    ]
  },
  {
    id: 'pilot',
    title: 'Pilot Program',
    description: 'A small-scale, short-term experiment that helps an organization learn.',
    category: 'business',
    details: [
      'Live deployment to a limited user base.',
      'Reduces risk of full-scale failure.',
      'Gathers real-world data.'
    ]
  },

  // UX Validation
  {
    id: 'wireframing',
    title: 'Wireframing',
    description: 'A visual guide that represents the skeletal framework of a website.',
    category: 'ux',
    details: [
      'Focuses on structure and layout.',
      'Low fidelity, no design polish.',
      'Quick to iterate.'
    ]
  },
  {
    id: 'usability',
    title: 'Usability Testing',
    description: 'Evaluating a product by testing it on users.',
    category: 'ux',
    details: [
      'Observing users attempting to complete tasks.',
      'Identifies friction points.',
      'Qualitative and quantitative data.'
    ]
  },

  // Testing
  {
    id: 'smoke',
    title: 'Smoke Testing',
    description: 'Preliminary testing to reveal simple failures severe enough to reject a release.',
    category: 'testing',
    details: [
      'Verifies critical functionalities.',
      'Performed before detailed testing.',
      '"Did the device catch fire?"'
    ]
  },
  {
    id: 'load',
    title: 'Load Testing',
    description: 'Testing the system under a specific expected load.',
    category: 'testing',
    details: [
      'Ensures stability under peak traffic.',
      'Identifies bottlenecks.',
      'Performance optimization.'
    ]
  }
];

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 'p1',
    title: 'Phase 1: Discovery & Research',
    duration: '2-4 Weeks',
    description: 'Foundational phase for understanding the problem space.',
    items: [
      {
        title: 'Idea Validation & Market Research',
        points: [
            'Define core problem.',
            'Identify target audience.',
            'Competitive analysis.',
            'Research market trends.'
        ],
        deliverable: 'Market Research Report'
      },
      {
        title: 'Requirements Gathering',
        points: [
            'Define functional requirements.',
            'Define non-functional requirements.',
            'Create user stories.',
            'Outline MVP features.'
        ],
        deliverable: 'PRD (Product Requirements Document)'
      },
      {
        title: 'Technical Feasibility',
        points: [
            'Assess complex features.',
            'Choose tech stack.',
            'Identify integrations.'
        ],
        deliverable: 'Tech Spec'
      }
    ]
  },
  {
    id: 'p2',
    title: 'Phase 2: Design',
    duration: '4-8 Weeks',
    description: 'Translating requirements into visual and interactive designs.',
    items: [
      {
        title: 'UX Design',
        points: [
            'Information Architecture.',
            'User Flows.',
            'Wireframing.'
        ],
        deliverable: 'Wireframes'
      },
      {
        title: 'UI Design',
        points: [
            'Visual Design Systems.',
            'High-fidelity mockups.',
            'Interactive prototyping.'
        ],
        deliverable: 'Figma Prototype'
      }
    ]
  },
  {
    id: 'p3',
    title: 'Phase 3: Development',
    duration: '8-16 Weeks',
    description: 'Building the actual product through iterative sprints.',
    items: [
      {
        title: 'Frontend & Backend Setup',
        points: [
            'Environment setup.',
            'Database schema design.',
            'API development.'
        ],
        deliverable: 'Dev Environment'
      },
      {
        title: 'Core Feature Implementation',
        points: [
            'Authentication.',
            'Core business logic.',
            'UI Implementation.'
        ],
        deliverable: 'Alpha Build'
      }
    ]
  },
  {
    id: 'p4',
    title: 'Phase 4: Testing & QA',
    duration: '4-8 Weeks',
    description: 'Ensuring product quality and stability.',
    items: [
      {
        title: 'Internal QA',
        points: [
            'Unit Testing.',
            'Integration Testing.',
            'Bug fixing.'
        ],
        deliverable: 'Test Reports'
      },
      {
        title: 'Beta Testing',
        points: [
            'User Acceptance Testing (UAT).',
            'Performance tuning.',
            'Security audit.'
        ],
        deliverable: 'Beta Release'
      }
    ]
  },
  {
    id: 'p5',
    title: 'Phase 5: Deployment & Launch',
    duration: '1-2 Weeks',
    description: 'Releasing the product to the market.',
    items: [
      {
        title: 'Store Submission',
        points: [
            'App Store optimization.',
            'Submission review process.',
            'Marketing asset preparation.'
        ],
        deliverable: 'Live App'
      }
    ]
  }
];
