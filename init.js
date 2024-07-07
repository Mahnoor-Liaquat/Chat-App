const mongoose = require('mongoose');
const connectToDatabase = require('./dbConnect');
const Chat = require('./models/chat');

mongoose.set('strictQuery', false);
connectToDatabase().then(() => {
  console.log('Connected to the database');
})
  // Create a new chat instance and save it
  let allChats=[
    {
        from: 'mahnoor',
        to: 'mahrukh',
        msg: 'send me your exam sheets',
        created_at: new Date(),
      },
      {
        from: 'mahrukh',
        to: 'mahnoor',
        msg: 'I will send them by evening',
        created_at: new Date(),
      },
      {
        from: 'mahnoor',
        to: 'mahrukh',
        msg: 'Thank you!',
        created_at: new Date(),
      },
      {
        from: 'mahrukh',
        to: 'mahnoor',
        msg: 'You\'re welcome!',
        created_at: new Date(),
      },
      {
        from: 'mahnoor',
        to: 'mahrukh',
        msg: 'Did you receive the notes I sent?',
        created_at: new Date(),
      },
      {
        from: 'mahrukh',
        to: 'mahnoor',
        msg: 'Yes, I got them. They are very helpful, thanks!',
        created_at: new Date(),
      },
      {
        from: 'mahnoor',
        to: 'mahrukh',
        msg: 'Great! Let me know if you need anything else.',
        created_at: new Date(),
      },

];

Chat.insertMany(allChats);