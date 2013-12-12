if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Test post 01',
    author: 'Admin',
    contents: 'How wonderful it is to have a Meteor powered blog'
  });
  Posts.insert({
    title: 'Test post 02',
    author: 'Admin',
    contents: 'How wonderful it is to have a Meteor powered blog'
  });
}