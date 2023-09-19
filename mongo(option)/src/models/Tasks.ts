import mongoose from 'mongoose';

interface TaskInterface {
  text: string,
  checked: boolean,
  id?: string,
  _id?: string
}

// const taskSchema = new mongoose.Schema<TaskInterface>({
//   text: {
//     type: String,
//     required: true
//   },
//   checked: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   id: {
//     type: String,
//     immutable: true
//   }
// })

// taskSchema.pre('save', function (next) {
//   this.id = this._id;
//   next();
// });

// const Task = mongoose.model('Task', taskSchema);

export { TaskInterface };