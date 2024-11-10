// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');  // Import UUID for unique IDs
// const app = express();
// const port = 3000;

// // Set up tasks directory and view engine
// const tasksDir = path.join(__dirname, 'tasks');
// if (!fs.existsSync(tasksDir)) fs.mkdirSync(tasksDir);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');

// // Helper function to get all tasks
// function getTasks() {
//   return fs.readdirSync(tasksDir).map(file => {
//     try {
//       const data = fs.readFileSync(path.join(tasksDir, file), 'utf-8').split('\n');
//       return {
//         id: path.parse(file).name,
//         title: data[0] || 'Untitled',
//         description: data[1] || '',
//         completed: data[2] === 'true',
//         important: data[3] === 'true'
//       };
//     } catch (error) {
//       console.error(`Error reading task file ${file}:`, error);
//       return null;
//     }
//   }).filter(task => task !== null);
// }

// // Route to display tasks on the main page
// app.get('/', (req, res) => {
//   const tasks = getTasks();
//   res.render('index', { tasks });
// });

// // Route to create a new task
// app.post('/create', (req, res) => {
//   const { title, description } = req.body;
//   if (title) {
//     const taskData = `${title}\n${description || ''}\nfalse\nfalse`;
//     const taskId = `${Date.now()}.txt`;
//     fs.writeFile(path.join(tasksDir, taskId), taskData, err => {
//       if (err) console.error(`Error creating task: ${err}`);
//       res.redirect('/');
//     });
//   } else {
//     res.redirect('/');
//   }
// });

// // Route to toggle task completion
// app.post('/toggle/:id', (req, res) => {
//   const taskFilePath = path.join(tasksDir, `${req.params.id}.txt`);
//   if (fs.existsSync(taskFilePath)) {
//     try {
//       const data = fs.readFileSync(taskFilePath, 'utf-8').split('\n');
//       const updatedData = `${data[0]}\n${data[1]}\n${data[2] === 'true' ? 'false' : 'true'}\n${data[3]}`;
//       fs.writeFileSync(taskFilePath, updatedData);
//     } catch (error) {
//       console.error(`Error toggling task status for ID ${req.params.id}:`, error);
//     }
//   }
//   res.redirect('/');
// });

// // Route to mark a task as important
// app.post('/important/:id', (req, res) => {
//   const taskFilePath = path.join(tasksDir, `${req.params.id}.txt`);
//   if (fs.existsSync(taskFilePath)) {
//     try {
//       const data = fs.readFileSync(taskFilePath, 'utf-8').split('\n');
//       const updatedData = `${data[0]}\n${data[1]}\n${data[2]}\n${data[3] === 'true' ? 'false' : 'true'}`;
//       fs.writeFileSync(taskFilePath, updatedData);
//     } catch (error) {
//       console.error(`Error marking task as important for ID ${req.params.id}:`, error);
//     }
//   }
//   res.redirect('/');
// });

// // Route to delete a specific task by ID
// app.post('/delete/:id', (req, res) => {
//   const taskFilePath = path.join(tasksDir, `${req.params.id}.txt`);
//   if (fs.existsSync(taskFilePath)) {
//     try {
//       fs.unlinkSync(taskFilePath);
//     } catch (error) {
//       console.error(`Error deleting task ID ${req.params.id}:`, error);
//     }
//   }
//   res.redirect('/');
// });

// // Route to render edit form for a specific task
// app.get('/edit/:id', (req, res) => {
//   const taskFilePath = path.join(tasksDir, `${req.params.id}.txt`);
//   if (fs.existsSync(taskFilePath)) {
//     const data = fs.readFileSync(taskFilePath, 'utf-8').split('\n');
//     const task = {
//       id: req.params.id,
//       title: data[0],
//       description: data[1] || '',
//       completed: data[2] === 'true',
//       important: data[3] === 'true'
//     };
//     res.render('edit', { task });
//   } else {
//     res.redirect('/');
//   }
// });



// // Route to update an existing task
// app.post('/update/:id', (req, res) => {
//   const taskFilePath = path.join(tasksDir, `${req.params.id}.txt`);
//   if (fs.existsSync(taskFilePath)) {
//     const { title, description, completed, important } = req.body;
//     const updatedData = `${title}\n${description || ''}\n${completed === 'on' ? 'true' : 'false'}\n${important === 'on' ? 'true' : 'false'}`;
    
//     try {
//       fs.writeFileSync(taskFilePath, updatedData);
//     } catch (error) {
//       console.error(`Error updating task ID ${req.params.id}:`, error);
//     }
//   }
//   res.redirect('/');
// });

// // Route to toggle the 'important' status of a task
// app.post('/important/:id', (req, res) => {
//   const taskFilePath = path.join(tasksDir, `${req.params.id}.txt`);
//   if (fs.existsSync(taskFilePath)) {
//     const data = fs.readFileSync(taskFilePath, 'utf-8').split('\n');
//     const updatedData = `${data[0]}\n${data[1]}\n${data[2]}\n${data[3] === 'true' ? 'false' : 'true'}`;
//     fs.writeFileSync(taskFilePath, updatedData);
//   }
//   res.redirect('/');
// });


// // Star/t server
// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const tasks = []; // Example array to store tasks in memory for simplicity

// app.use(bodyParser.urlencoded({ extended: true }));

// // Route to display tasks on index page
// app.get('/', (req, res) => {
//   res.render('index', { tasks });
// });

// // Route to add a new task
// app.post('/create', (req, res) => {
//   const task = { id: Date.now(), title: req.body.title, important: false };
//   tasks.push(task);
//   res.redirect('/');
// });

// // Route to mark a task as important
// app.post('/important/:id', (req, res) => {
//   const task = tasks.find(task => task.id == req.params.id);
//   if (task) task.important = !task.important;
//   res.redirect('/');
// });

// // Route to render edit form
// app.get('/edit/:id', (req, res) => {
//   const task = tasks.find(task => task.id == req.params.id);
//   if (task) {
//     res.render('edit', { task });
//   } else {
//     res.redirect('/');
//   }
// });

// // Route to update task after edit
// app.post('/update/:id', (req, res) => {
//   const task = tasks.find(task => task.id == req.params.id);
//   if (task) {
//     task.title = req.body.title; // Update the title
//   }
//   res.redirect('/');
// });

// // Route to delete a task
// app.post('/delete/:id', (req, res) => {
//   const index = tasks.findIndex(task => task.id == req.params.id);
//   if (index > -1) {
//     tasks.splice(index, 1);
//   }
//   res.redirect('/');
// });

// // Set up EJS as the template engine
// app.set('view engine', 'ejs');

// app.listen(3000, () => {
//   console.log('Server started on http://localhost:3000');
// });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const tasksDir = path.join(__dirname, 'tasks'); // Directory to store tasks as files

// Ensure tasks directory exists
if (!fs.existsSync(tasksDir)) {
  fs.mkdirSync(tasksDir);
}

app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to read all tasks from the filesystem
const readTasksFromFile = () => {
  const tasks = [];
  const taskFiles = fs.readdirSync(tasksDir); // Get all task files in the tasks directory
  taskFiles.forEach((file) => {
    const taskContent = fs.readFileSync(path.join(tasksDir, file), 'utf8');
    const [title, important, completed] = taskContent.split('\n');
    tasks.push({
      id: file.replace('.txt', ''), // Use filename as task ID
      title: title.trim(),
      important: important === 'true',
      completed: completed === 'true'
    });
  });
  return tasks;
};

// Helper function to write a task to a file
const writeTaskToFile = (task) => {
  const filePath = path.join(tasksDir, `${task.id}.txt`);
  fs.writeFileSync(filePath, `${task.title}\n${task.important}\n${task.completed}`, 'utf8');
};

// Route to display tasks on index page
app.get('/', (req, res) => {
  const tasks = readTasksFromFile(); // Get tasks from the filesystem
  res.render('index', { tasks });
});

// Route to add a new task
app.post('/create', (req, res) => {
  const taskId = Date.now().toString(); // Unique ID based on current timestamp
  const task = { id: taskId, title: req.body.title, important: false, completed: false };
  writeTaskToFile(task); // Write task to filesystem
  res.redirect('/');
});

// Route to mark a task as important
app.post('/important/:id', (req, res) => {
  const tasks = readTasksFromFile(); // Get current tasks
  const task = tasks.find(task => task.id == req.params.id);
  if (task) {
    task.important = !task.important; // Toggle important status
    writeTaskToFile(task); // Save updated task to filesystem
  }
  res.redirect('/');
});

// Route to render edit form
app.get('/edit/:id', (req, res) => {
  const tasks = readTasksFromFile(); // Get current tasks
  const task = tasks.find(task => task.id == req.params.id);
  if (task) {
    res.render('edit', { task });
  } else {
    res.redirect('/');
  }
});

// Route to update task after edit
app.post('/update/:id', (req, res) => {
  const tasks = readTasksFromFile(); // Get current tasks
  const task = tasks.find(task => task.id == req.params.id);
  if (task) {
    task.title = req.body.title; // Update the title
    task.important = req.body.important === 'true'; // Update important status
    task.completed = req.body.completed === 'true'; // Update completed status
    writeTaskToFile(task); // Save updated task to filesystem
  }
  res.redirect('/');
});

// Route to delete a task
app.post('/delete/:id', (req, res) => {
  const taskFilePath = path.join(tasksDir, `${req.params.id}.txt`);
  if (fs.existsSync(taskFilePath)) {
    fs.unlinkSync(taskFilePath); // Delete task file
  }
  res.redirect('/');
});

// Route to toggle task completion
app.post('/complete/:id', (req, res) => {
  const tasks = readTasksFromFile(); // Get current tasks
  const task = tasks.find(task => task.id == req.params.id);
  if (task) {
    task.completed = !task.completed; // Toggle completed status
    writeTaskToFile(task); // Save updated task to filesystem
  }
  res.redirect('/');
});

// Route to display only important tasks
app.get('/important', (req, res) => {
  const tasks = readTasksFromFile(); // Get all tasks from the filesystem
  const importantTasks = tasks.filter(task => task.important); // Filter only important tasks
  res.render('index', { tasks: importantTasks }); // Render the tasks to the 'index' view
});

// Set up EJS as the template engine
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
