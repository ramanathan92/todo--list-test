const appConfig = {
  port: process.env.PORT || 4000
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://rcysynuser:3uXvf6SMhAcdJy4J@cluster0.d3mrx.mongodb.net/todo_api?retryWrites=true&w=majority'
};

const logConfig = {
  level: process.env.LOG_LEVEL || 'debug'
};

module.exports = {
  appConfig,
  dbConfig,
  logConfig
}
