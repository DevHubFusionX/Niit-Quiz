// Sample questions for offline/fallback mode
export const sampleQuestions = {
  'programming-logic': [
    {
      _id: '1',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correct: 1
    },
    {
      _id: '2',
      question: 'Which data structure uses LIFO (Last In, First Out) principle?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correct: 1
    },
    {
      _id: '3',
      question: 'What does "recursion" mean in programming?',
      options: ['A loop that runs forever', 'A function that calls itself', 'A type of variable', 'A sorting algorithm'],
      correct: 1
    },
    {
      _id: '4',
      question: 'Which sorting algorithm has the best average-case time complexity?',
      options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'],
      correct: 2
    },
    {
      _id: '5',
      question: 'What is the purpose of a constructor in object-oriented programming?',
      options: ['To destroy objects', 'To initialize objects', 'To copy objects', 'To compare objects'],
      correct: 1
    }
  ],
  'php': [
    {
      _id: '6',
      question: 'Which symbol is used to start a PHP variable?',
      options: ['@', '#', '$', '%'],
      correct: 2
    },
    {
      _id: '7',
      question: 'What does PHP stand for?',
      options: ['Personal Home Page', 'PHP: Hypertext Preprocessor', 'Private Home Page', 'Public Hypertext Processor'],
      correct: 1
    },
    {
      _id: '8',
      question: 'Which function is used to include a file in PHP?',
      options: ['import()', 'include()', 'require()', 'Both include() and require()'],
      correct: 3
    },
    {
      _id: '9',
      question: 'What is the correct way to end a PHP statement?',
      options: ['.', ';', ':', ','],
      correct: 1
    },
    {
      _id: '10',
      question: 'Which superglobal variable contains information about headers, paths, and script locations?',
      options: ['$_GET', '$_POST', '$_SERVER', '$_SESSION'],
      correct: 2
    }
  ],
  'dreamweaver': [
    {
      _id: '11',
      question: 'What is the primary use of Adobe Dreamweaver?',
      options: ['Video editing', 'Web design and development', 'Photo editing', 'Database management'],
      correct: 1
    },
    {
      _id: '12',
      question: 'Which view in Dreamweaver lets you edit HTML visually?',
      options: ['Design View', 'Code View', 'Split View', 'Live View'],
      correct: 0
    },
    {
      _id: '13',
      question: 'What does the Files panel in Dreamweaver manage?',
      options: ['Images', 'Site files and folders', 'Fonts', 'JavaScript libraries'],
      correct: 1
    },
    {
      _id: '14',
      question: 'Which view allows you to see both code and design together?',
      options: ['Split View', 'Live View', 'Browser View', 'Preview Mode'],
      correct: 0
    },
    {
      _id: '15',
      question: 'What is a Dreamweaver template used for?',
      options: ['Creating reusable layouts', 'Managing CSS files', 'Previewing sites', 'Editing JavaScript'],
      correct: 0
    }
  ]
};

export const sampleSubjects = {
  'programming-logic': {
    name: 'Programming Logic & Techniques',
    description: 'Master programming logic and problem-solving techniques',
    code: 'programming-logic'
  },
  'php': {
    name: 'PHP Programming',
    description: 'Learn PHP web development fundamentals',
    code: 'php'
  },
  'dreamweaver': {
    name: 'Adobe Dreamweaver',
    description: 'Master web design and development with Dreamweaver',
    code: 'dreamweaver'
  }
};