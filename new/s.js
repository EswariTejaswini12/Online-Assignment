document.addEventListener('DOMContentLoaded', function() {
    const studentBtn = document.getElementById('student-btn');
    const teacherBtn = document.getElementById('teacher-btn');
    const loginSection = document.getElementById('login-section');
    const studentSection = document.getElementById('student-section');
    const teacherSection = document.getElementById('teacher-section');
    const courseButtonsContainer = document.getElementById('course-buttons');
    const courseQuestionsContainer = document.getElementById('course-questions');
    const feedbackContainer = document.getElementById('feedback');

    // Simulated backend data for courses and questions
    let courses = {
        'Java': [
            { question: 'What is Java?', options: ['A database', 'A programming language', 'A framework', 'An operating system'], answerIndex: 1 },
            { question: 'Who invented Java?', options: ['James Gosling', 'Bill Gates', 'Steve Jobs', 'Mark Zuckerberg'], answerIndex: 0 },
            { question: 'What does JVM stand for?', options: ['Java Virtual Memory', 'Java Vertical Model', 'Java Virtual Machine', 'Java Variable Machine'], answerIndex: 2 },
            { question: 'What are the main principles of OOP?', options: ['Aggregation, Association, Composition', 'Abstraction, Modularity, Inheritance', 'Data hiding, Inheritance, Polymorphism', 'Encapsulation, Inheritance, Polymorphism'], answerIndex: 3 },
            { question: 'What is the difference between JDK and JRE?', options: ['JDK is for development, JRE is for running Java programs', 'JRE is for development, JDK is for running Java programs', 'JDK and JRE are the same', 'None of the above'], answerIndex: 0 }
        ],
        'Python': [
            { question: 'What is Python?', options: ['A database', 'A programming language', 'A framework', 'An operating system'], answerIndex: 1 },
            { question: 'Who developed Python?', options: ['James Gosling', 'Guido van Rossum', 'Steve Jobs', 'Mark Zuckerberg'], answerIndex: 1 },
            { question: 'What does PEP stand for in Python?', options: ['Python Enhancement Proposal', 'Python Extended Programming', 'Python Evolution Plan', 'Python Environment Package'], answerIndex: 0 },
            { question: 'What is a Python decorator?', options: ['A function that takes another function and extends its behavior', 'A module that decorates GUIs in Python', 'A Python script that decorates images', 'None of the above'], answerIndex: 0 },
            { question: 'What is the purpose of "self" in Python?', options: ['To refer to the class instance itself', 'To reference other objects in Python', 'To create class decorators', 'To reference global variables'], answerIndex: 0 }
        ]
    };

    // Event listeners for buttons
    studentBtn.addEventListener('click', function() {
        loginSection.style.display = 'block';
        document.getElementById('student-login').style.display = 'block';
        document.getElementById('teacher-login').style.display = 'none';
    });

    teacherBtn.addEventListener('click', function() {
        loginSection.style.display = 'block';
        document.getElementById('student-login').style.display = 'none';
        document.getElementById('teacher-login').style.display = 'block';
    });

    // Login form submission handlers
    document.getElementById('student-login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Perform login verification here (e.g., check against a list of users)
        loginSection.style.display = 'none';
        studentSection.style.display = 'block';
        teacherSection.style.display = 'none';

        // Clear previous course buttons
        courseButtonsContainer.innerHTML = '';

        // Generate course buttons dynamically
        Object.keys(courses).forEach(course => {
            const courseButton = document.createElement('button');
            courseButton.textContent = course;
            courseButton.addEventListener('click', function() {
                showQuestions(course);
            });
            courseButtonsContainer.appendChild(courseButton);
        });
    });

    document.getElementById('teacher-login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Perform login verification here (e.g., check against a list of users)
        loginSection.style.display = 'none';
        studentSection.style.display = 'none';
        teacherSection.style.display = 'block';
    });

    // Function to show questions for a selected course
    function showQuestions(courseName) {
        courseQuestionsContainer.innerHTML = '';

        courses[courseName].forEach((questionObj, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${questionObj.question}`;
            questionDiv.appendChild(questionText);

            questionObj.options.forEach((option, optionIndex) => {
                const optionLabel = document.createElement('label');
                optionLabel.textContent = option;
                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = `question-${index}`;
                optionInput.value = optionIndex;
                optionLabel.appendChild(optionInput);
                questionDiv.appendChild(optionLabel);
            });

            courseQuestionsContainer.appendChild(questionDiv);
        });

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.addEventListener('click', function() {
            const selectedOptions = courseQuestionsContainer.querySelectorAll('input[type=radio]:checked');
            const correctAnswers = courses[courseName].filter((q, i) => q.answerIndex == selectedOptions[i].value).length;
            feedbackContainer.innerHTML = `You got ${correctAnswers} out of ${courses[courseName].length} correct!`;
        });

        courseQuestionsContainer.appendChild(submitBtn);
    }

    // Add course form submission
    document.getElementById('add-new-course-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const newCourseName = document.getElementById('new-course-name').value.trim();
        if (newCourseName && !courses[newCourseName]) {
            courses[newCourseName] = [];
            updateCourseSelectOptions();
            alert(`Course '${newCourseName}' added successfully!`);
        } else {
            alert('Course already exists or name is invalid.');
        }
        document.getElementById('new-course-name').value = '';
    });

    // Add question form submission
    document.getElementById('add-question-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedCourse = document.getElementById('course-name-for-question').value;
        const newQuestion = document.getElementById('new-question').value.trim();
        const options = [
            document.getElementById('option-1').value.trim(),
            document.getElementById('option-2').value.trim(),
            document.getElementById('option-3').value.trim(),
            document.getElementById('option-4').value.trim()
        ];
        const correctAnswer = document.getElementById('correct-answer').value;

        if (selectedCourse && newQuestion && options.every(option => option) && correctAnswer !== '') {
            courses[selectedCourse].push({ question: newQuestion, options, answerIndex: parseInt(correctAnswer) });
            alert(`Question added successfully to '${selectedCourse}'!`);
        } else {
            alert('All fields are required.');
        }

        document.getElementById('new-question').value = '';
        options.forEach((_, i) => document.getElementById(`option-${i+1}`).value = '');
    });

    // Remove course form submission
    document.getElementById('remove-course-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const courseNameToRemove = document.getElementById('course-name-to-remove').value.trim();
        if (courses[courseNameToRemove]) {
            delete courses[courseNameToRemove];
            updateCourseSelectOptions();
            alert(`Course '${courseNameToRemove}' removed successfully!`);
        } else {
            alert('Course does not exist.');
        }
        document.getElementById('course-name-to-remove').value = '';
    });

    // Remove question form submission
    document.getElementById('remove-question-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedCourse = document.getElementById('course-name-for-removal').value;
        const questionIndex = document.getElementById('question-for-removal').value;

        if (selectedCourse && questionIndex !== '') {
            courses[selectedCourse].splice(questionIndex, 1);
            updateQuestionSelectOptions(selectedCourse);
            alert(`Question removed successfully from '${selectedCourse}'!`);
        } else {
            alert('All fields are required.');
        }
    });

    // Function to update course select options in forms
    function updateCourseSelectOptions() {
        const courseSelectForQuestion = document.getElementById('course-name-for-question');
        const courseSelectForRemoval = document.getElementById('course-name-for-removal');
        [courseSelectForQuestion, courseSelectForRemoval].forEach(select => {
            select.innerHTML = '<option value="">Select Course</option>';
            Object.keys(courses).forEach(course => {
                const option = document.createElement('option');
                option.value = course;
                option.textContent = course;
                select.appendChild(option);
            });
        });
    }

    // Function to update question select options in the remove question form
    function updateQuestionSelectOptions(courseName) {
        const questionSelect = document.getElementById('question-for-removal');
        questionSelect.innerHTML = '<option value="">Select Question</option>';
        courses[courseName].forEach((questionObj, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${index + 1}. ${questionObj.question}`;
            questionSelect.appendChild(option);
        });
    }

    // Event listener for course selection in remove question form
    document.getElementById('course-name-for-removal').addEventListener('change', function() {
        updateQuestionSelectOptions(this.value);
    });

    // Initial update of course select options
    updateCourseSelectOptions();

});
