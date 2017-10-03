let questions = [
      {
            id: 1,
            text: 'Which is the oldest airline in the world?',
            imgSrc: 'img/foto1.png',
            options: [{ id: 'a', text: 'Avianca' }, { id: 'b', text: 'KLM' }, { id: 'c', text: 'Qantas' }],
            correct: 'b'
      },
      {
            id: 2,
            text: 'Which is the largest port in the world?',
            imgSrc: 'img/foto2.png',
            options: [{ id: 'a', text: 'Port of Shangai' }, { id: 'b', text: 'Port of Singapore' }, { id: 'c', text: 'Port Rotterdam' }],
            correct: 'a'
      },
      {
            id: 3,
            text: 'What is the longest distance cycling backwards?',
            imgSrc: 'img/foto3.png',
            options: [{ id: 'a', text: '89.30 km' }, { id: 'b', text: '675.10 km' }, { id: 'c', text: '337.60 km' }],
            correct: 'c'
      },
      {
            id: 4,
            text: 'What is the highest speed ever reached by a school bus?',
            imgSrc: 'img/foto5.png',
            options: [{ id: 'a', text: '590 km/h' }, { id: 'b', text: '320 km/h' }, { id: 'c', text: '245 km/h' }],
            correct: 'a'
      },
      {
            id: 5,
            text: 'What is the longest car trip on one tank of gas?',
            imgSrc: 'img/foto4.png',
            options: [{ id: 'a', text: '2617 km' }, { id: 'b', text: '3568 km' }, { id: 'c', text: '1732 km' }],
            correct: 'a'
      }
]

class Model {
      constructor(questions, options) {
            this.questions = questions;
            this.options = options;
            this.answered = []; //this.todos = [];
            this.score = 0;
            this.count = 0;
            this.current = 1;
            this.complete = false;
            this.compare = false;
            this.inputValue = null;
            this.render = undefined;
      }

      subscribe(render) {
            this.render = render;
      }
      inform() {
            console.log(this.questions.map(e => e.text)); //console.log(this.todos.map(e => e.text));
            this.render();
      }
      addTodo(e) {
            this.answered.push({
                  res: e.target.value,
            });
            this.inform();
      }
      updateTodo(index, todo) {
            this.questions[index] = todo;
            this.inform();
      }
}

const App = ({ title, model }) => {
      const items = model.options.map((todo, index) => {
         return (
            <li key={todo.id}>
               <input
                  type="text"
                  value={todo.text}
                  onChange={e =>
                     model.updateTodo(index, {
                        id: todo.id,
                        text: e.target.value,
                        completed: todo.completed
                     })}
               />
               <button onClick={() => model.removeTodo(todo)}> delete item</button>
            </li>
         );
      });
      return (
         <div>
            <h1> {title} </h1>
            <form
               onSubmit={e => {
                  e.preventDefault();
                  model.addTodo(model.inputValue);
               }}
            >
               <input onChange={e => (model.inputValue = e.target.value)} />
               <button type="submit">Add Item</button>
            </form>
            <ol> {items} </ol>
         </div>
      );
   };

let model = new Model(questions);
let counter = 1;
let render = () => {
      console.log('render times: ', counter++);
      ReactDOM.render(
            <App title="TodoApp" model={model} />,
            document.getElementById('container')
      );
};

model.subscribe(render);
render(); 