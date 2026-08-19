export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  questions: Question[];
};

export const categories: Category[] = [
  {
    id: "greener-healthcare",
    name: "Greener Healthcare",
    icon: "HeartPulse",
    color: "oklch(0.72 0.17 150)",
    questions: [
      {
        id: "gh-1",
        question: "Which can help reduce the environmental impact of healthcare operations?",
        options: [
          "Responsible waste management",
          "Energy efficiency",
          "Sustainable procurement",
          "All of the above",
        ],
        correctAnswer: 3,
      },
      {
        id: "gh-2",
        question:
          "True or False: Sustainability in healthcare only concerns the disposal of medical waste.",
        options: ["True", "False"],
        correctAnswer: 1,
      },
      {
        id: "gh-3",
        question: "Which is an example of sustainable procurement in healthcare?",
        options: [
          "Choosing suppliers based only on speed",
          "Considering environmental impact alongside quality and commercial requirements",
          "Always choosing the cheapest product",
          "Replacing equipment as frequently as possible",
        ],
        correctAnswer: 1,
      },
      {
        id: "gh-4",
        question: "Which action can support a more sustainable healthcare facility?",
        options: [
          "Reducing unnecessary energy consumption",
          "Managing waste responsibly",
          "Conserving water",
          "All of the above",
        ],
        correctAnswer: 3,
      },
      {
        id: "gh-5",
        question:
          "True or False: Healthcare organisations can pursue sustainability while still prioritising patient safety and quality.",
        options: ["True", "False"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "waste-wise",
    name: "Waste Wise",
    icon: "Recycle",
    color: "oklch(0.75 0.16 175)",
    questions: [
      {
        id: "ww-1",
        question: "Which generally comes before recycling in the waste hierarchy?",
        options: ["Disposal", "Reducing and reusing", "Landfill", "Incineration"],
        correctAnswer: 1,
      },
      {
        id: "ww-2",
        question:
          "True or False: Everything placed in a recycling bin will automatically be recycled.",
        options: ["True", "False"],
        correctAnswer: 1,
      },
      {
        id: "ww-3",
        question: "What is e-waste?",
        options: [
          "Food waste",
          "Paper packaging",
          "Discarded electrical and electronic equipment",
          "Wastewater",
        ],
        correctAnswer: 2,
      },
      {
        id: "ww-4",
        question:
          "If an item can safely be reused rather than replaced, which is generally the more sustainable option?",
        options: ["Throw it away", "Reuse it", "Replace it immediately", "Store it indefinitely"],
        correctAnswer: 1,
      },
      {
        id: "ww-5",
        question: "What is the main idea behind a circular economy?",
        options: [
          "Produce, use and dispose",
          "Keep products and materials in use for as long as possible",
          "Recycle everything once",
          "Stop manufacturing products",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "power-smart",
    name: "Power Smart",
    icon: "Zap",
    color: "oklch(0.85 0.17 95)",
    questions: [
      {
        id: "ps-1",
        question: "Which action can reduce unnecessary workplace energy consumption?",
        options: [
          "Leaving equipment running overnight",
          "Switching off unnecessary equipment",
          "Keeping unused areas fully lit",
          "Cooling empty spaces",
        ],
        correctAnswer: 1,
      },
      {
        id: "ps-2",
        question:
          "True or False: LED lighting generally consumes less electricity than traditional incandescent lighting.",
        options: ["True", "False"],
        correctAnswer: 0,
      },
      {
        id: "ps-3",
        question:
          "Which building system can automatically help manage lighting and air-conditioning efficiently?",
        options: ["CRM", "GPS", "Building Management System (BMS)", "POS system"],
        correctAnswer: 2,
      },
      {
        id: "ps-4",
        question: "Which behaviour wastes energy?",
        options: [
          "Using occupancy-controlled lighting",
          "Maintaining equipment efficiently",
          "Cooling an unoccupied room unnecessarily",
          "Switching equipment off when not required",
        ],
        correctAnswer: 2,
      },
      {
        id: "ps-5",
        question:
          "True or False: Small energy-saving actions can contribute to reducing an organisation's overall environmental footprint.",
        options: ["True", "False"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "every-drop-counts",
    name: "Every Drop Counts",
    icon: "Droplets",
    color: "oklch(0.74 0.14 220)",
    questions: [
      {
        id: "ed-1",
        question: "Which is an effective way to reduce unnecessary water consumption?",
        options: [
          "Increasing water pressure",
          "Installing water-efficient fixtures",
          "Leaving taps running",
          "Watering regardless of need",
        ],
        correctAnswer: 1,
      },
      {
        id: "ed-2",
        question:
          "True or False: A leaking tap can contribute to unnecessary water consumption over time.",
        options: ["True", "False"],
        correctAnswer: 0,
      },
      {
        id: "ed-3",
        question: "Which irrigation method can help use water more efficiently?",
        options: [
          "Flood irrigation",
          "Drip irrigation",
          "Leaving sprinklers continuously running",
          "Increasing water pressure",
        ],
        correctAnswer: 1,
      },
      {
        id: "ed-4",
        question: "What does water conservation mean?",
        options: [
          "Never using water",
          "Using water responsibly and avoiding unnecessary waste",
          "Only drinking bottled water",
          "Increasing water storage",
        ],
        correctAnswer: 1,
      },
      {
        id: "ed-5",
        question: "True or False: Water efficiency is relevant to businesses as well as households.",
        options: ["True", "False"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "your-esg-move",
    name: "Your ESG Move",
    icon: "Footprints",
    color: "oklch(0.82 0.16 130)",
    questions: [
      {
        id: "em-1",
        question:
          "You're at an event and need water throughout the day. Which is generally the more sustainable choice?",
        options: [
          "Take a new disposable bottle each time",
          "Use and refill a reusable bottle",
          "Use several disposable cups",
          "Avoid drinking water",
        ],
        correctAnswer: 1,
      },
      {
        id: "em-2",
        question:
          "Four colleagues are travelling to the same destination. Which option can reduce transport emissions per person?",
        options: [
          "Four separate cars",
          "Carpooling",
          "Taking longer individual routes",
          "Leaving at different times",
        ],
        correctAnswer: 1,
      },
      {
        id: "em-3",
        question: "You receive a document that only needs reviewing. What should you do?",
        options: [
          "Print several copies",
          "Review it digitally",
          "Print one copy for everyone",
          "Print every email attachment",
        ],
        correctAnswer: 1,
      },
      {
        id: "em-4",
        question:
          "Your phone or laptop reaches the end of its useful life. What is generally the better option?",
        options: [
          "Put it in general waste",
          "Leave it in a drawer forever",
          "Use an approved e-waste recycling or recovery programme",
          "Throw it away with food waste",
        ],
        correctAnswer: 2,
      },
      {
        id: "em-5",
        question:
          "You're buying takeaway coffee every morning. Which habit can reduce single-use waste?",
        options: [
          "Ask for two cups",
          "Use a reusable cup where accepted",
          "Take additional lids",
          "Use a new cup for every refill",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "esg-challenge",
    name: "ESG Challenge",
    icon: "Globe2",
    color: "oklch(0.78 0.13 300)",
    questions: [
      {
        id: "ec-1",
        question: "What does ESG stand for?",
        options: [
          "Energy, Sustainability & Growth",
          "Environmental, Social & Governance",
          "Environmental, Safety & Growth",
          "Ethics, Sustainability & Governance",
        ],
        correctAnswer: 1,
      },
      {
        id: "ec-2",
        question: "Which belongs primarily to the Environmental pillar?",
        options: [
          "Employee wellbeing",
          "Business ethics",
          "Energy efficiency",
          "Whistleblower protection",
        ],
        correctAnswer: 2,
      },
      {
        id: "ec-3",
        question: "Which belongs primarily to the Social pillar?",
        options: [
          "Carbon emissions",
          "Employee health and wellbeing",
          "Energy consumption",
          "Anti-bribery controls",
        ],
        correctAnswer: 1,
      },
      {
        id: "ec-4",
        question: "Which belongs primarily to Governance?",
        options: [
          "Recycling",
          "Water efficiency",
          "Carpooling",
          "Business ethics and anti-bribery controls",
        ],
        correctAnswer: 3,
      },
      {
        id: "ec-5",
        question: "Which statement best describes ESG?",
        options: [
          "It only concerns climate change",
          "It is another word for recycling",
          "It considers environmental, social and governance factors in how an organisation operates",
          "It only applies to large industrial companies",
        ],
        correctAnswer: 2,
      },
    ],
  },
];
