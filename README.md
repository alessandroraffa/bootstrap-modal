# $().bootstrapModal({

*A simple function for creating modals*

bootstrapModal helps you rapidly use Twitter Bootstrap modal JavaScript plugin for creating alerts, notifications, confirm modals and more.

Just write:

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

See the example index.html for more options.

# });