# $().bootstrapModal({

*A simple function for creating modals*

bootstrapModal helps you rapidly use <a href="http://twitter.github.com/bootstrap/javascript.html#modals">Twitter Bootstrap modal JavaScript plugin</a> for creating alerts, notifications, confirm modals and more.

With bootstrapModal you do not need to add any HTML hidden div.

Just include jQuery 1.8 and Bootstrap 2.2.1.

Write:

```javascript
$().bootstrapModal({
  title: 'Alert',
  body:  'This is an alert!'
});
```

and it will display a nice dismissable modal.

If you need a confirm modal write:

```javascript
$('#delete-button').click(function(){
  $().bootstrapModal({
    title:'Delete confirm',
    body:'Do you really want to delete this?',
    action:{
      label:'Delete',
      style:'danger',
      callback:function(){
        // javascript code for executing the dangerous action...
      }
    },
    dismiss_label:'Cancel'
  });
});
```

See more examples into index.html for more options.

# });