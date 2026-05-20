export const pythonModules = [
  {
    id: 1,
    title: "1. Welcome to Python",
    description: "Learn about what Python is and why it's the most popular language today.",
    content: "# Welcome to Python\n\nPython is a high-level, interpreted programming language known for its readability and versatility.\n\n### Why Python?\n1. **Easy to Learn**: Simple syntax and readable code.\n2. **Versatile**: Used in Web Dev, Data Science, AI, and Automation.\n3. **Huge Community**: Plenty of documentation and libraries.\n\nIn this module, we will explore the history of Python and its core philosophy: *The Zen of Python*."
  },
  {
    id: 2,
    title: "2. Setting Up Your Environment",
    description: "Prepare your machine for Python development.",
    content: "# Environment Setup\n\nBefore we start coding, we need to install Python and a code editor.\n\n### Steps:\n1. Download Python from [python.org](https://python.org).\n2. Install Visual Studio Code (Recommended).\n3. Install the Python Extension for VS Code.\n\nTest your installation by typing `python --version` in your terminal."
  },
  {
    id: 3,
    title: "3. Variables and Data Types",
    description: "Storing information using strings, integers, and floats.",
    content: "# Variables and Data Types\n\nVariables are containers for storing data values.\n\n```python\nname = 'SyntaxForge'\nage = 25\nprice = 19.99\nis_active = True\n```\n\nCommon types include `int`, `str`, `float`, and `bool`."
  },
  {
    id: 4,
    title: "4. Basic Arithmetic Operators",
    description: "Mathematical operations within Python.",
    content: "# Basic Operators\n\nPython can be used as a powerful calculator.\n\n```python\na = 10\nb = 3\n\nprint(a + b) # Addition\nprint(a - b) # Subtraction\nprint(a * b) # Multiplication\nprint(a / b) # Division\nprint(a % b) # Modulo (Remainder)\n```"
  },
  {
    id: 5,
    title: "5. Conditional Logic (If-Else)",
    description: "Making decisions in your code.",
    content: "# Control Flow: If-Else\n\nUse conditional statements to execute code based on conditions.\n\n```python\nscore = 85\n\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')\n```"
  },
  {
    id: 6,
    title: "6. Loops: For and While",
    description: "Repeating tasks automatically.",
    content: "# Loops\n\nLoops are used to iterate over a sequence.\n\n### For Loop\n```python\nfor i in range(5):\n    print(f'Count: {i}')\n```\n\n### While Loop\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n```"
  },
  {
    id: 7,
    title: "7. Defining and Using Functions",
    description: "Breaking your code into reusable blocks.",
    content: "# Functions\n\nA function is a block of code which only runs when it is called.\n\n```python\ndef greet(name):\n    return f'Hello, {name}!'\n\nmessage = greet('Student')\nprint(message)\n```"
  },
  {
    id: 8,
    title: "8. Lists and Tuples",
    description: "Managing collections of data.",
    content: "# Lists and Tuples\n\nLists are mutable collections, while Tuples are immutable.\n\n```python\nfruits = ['apple', 'banana', 'cherry']\nfruits.append('orange')\n\ncoordinates = (10, 20)\n```"
  },
  {
    id: 9,
    title: "9. Dictionaries and Sets",
    description: "Key-value pairs and unique collections.",
    content: "# Dictionaries\n\nDictionaries store data in key:value pairs.\n\n```python\nuser = {\n    'name': 'Wanda',\n    'level': 10\n}\nprint(user['name'])\n```"
  },
  {
    id: 10,
    title: "10. Exception Handling",
    description: "Handling errors gracefully with Try-Except.",
    content: "# Error Handling\n\nPrevent your program from crashing when an error occurs.\n\n```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('You cannot divide by zero!')\n```"
  },
  {
    id: 11,
    title: "11. File I/O",
    description: "Reading and writing files on your system.",
    content: "# File Handling\n\n```python\nwith open('test.txt', 'w') as f:\n    f.write('Hello SyntaxForge!')\n\nwith open('test.txt', 'r') as f:\n    print(f.read())\n```"
  },
  {
    id: 12,
    title: "12. Object-Oriented Programming (I)",
    description: "Classes and Objects in Python.",
    content: "# OOP: Classes\n\nClasses provide a means of bundling data and functionality together.\n\n```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n\nmy_dog = Dog('Buddy')\nprint(my_dog.name)\n```"
  },
  {
    id: 13,
    title: "13. Object-Oriented Programming (II)",
    description: "Inheritance and Polymorphism.",
    content: "# OOP: Inheritance\n\nInheritance allows us to define a class that inherits all the methods and properties from another class.\n\n```python\nclass Animal:\n    def speak(self):\n        pass\n\nclass Cat(Animal):\n    def speak(self):\n        return 'Meow'\n```"
  },
  {
    id: 14,
    title: "14. Modules and Packages",
    description: "Organizing code across multiple files.",
    content: "# Modules\n\nImport built-in modules or your own files.\n\n```python\nimport math\nprint(math.sqrt(16))\n\nfrom datetime import datetime\nprint(datetime.now())\n```"
  },
  {
    id: 15,
    title: "15. The Final Project: CLI App",
    description: "Build a complete project from scratch.",
    content: "# Final Project\n\nLet's build a Task Manager CLI App that utilizes all the concepts learned:\n- Variables and Lists to store tasks\n- Functions to add/remove tasks\n- File handling to save tasks permanently\n- Error handling for invalid inputs"
  }
];
