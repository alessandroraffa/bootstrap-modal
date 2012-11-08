/*!
 * bootstrapModal
 * Version: 0.0.1
 *
 * Dual licensed under the MIT and GPL licenses.
 *
 * Copyright (c) 2012 Alessandro Raffa <contact@alessandroraffa.eu>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * @see http://opensource.org/licenses/mit-license.php
 * @see http://www.gnu.org/licenses/gpl.html
 *
 * Requires: jQuery v1.8.0 or later, Twitter Bootstrap v2.2.1 or later
 */

/**
 * bootstrapModal
 * @author  Alessandro Raffa <contact@alessandroraffa.eu>
 * @todo    write clear documentation ;-)
 * @todo    improove performance
 * @todo    cross-browser compatibility
 */
(function($){
  $.fn.extend({
    bootstrapModal: function(options){

      /**
       * Stores the version
       */
      var _version = '0.0.1';

      // @todo  check minimum required versions of jquery and bootstrap

      // default options
      var defaults = {
        title:          '',
        title_style:    '',
        body:           '',
        dismiss:        true,
        dismiss_label:  'Ok',
        autodismiss:    false,
        action:         {},
        countdown:      3,
        debug:          false
      }

      /**
       * @see     ...
       * @author  ...
       */
      var ___checkType = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
      }

      //
      switch ( ___checkType(options) ) {

        case 'string':

          switch (options) {
            case 'version':
              return _version;
              break;
            default:
              return null;
              break;
          }

          break;

        case 'null':
        case 'object':

          // reading current options
          var options = $.extend(defaults, options);

          var counter = null;

          var countdown = options.countdown;

          var title_styles = ['warning','error','info','success'];

          var action_styles = ['warning','danger','info','success','primary','inverse'];

          var _modal = $(document.createElement('div'));
          var _modal_header = $(document.createElement('div'));
          var _modal_header_dismisser = $(document.createElement('button'));
          var _modal_header_title = $(document.createElement('h3'));
          var _modal_body = $(document.createElement('div'));
          var _modal_footer = $(document.createElement('div'));
          var _modal_footer_dismisser = $(document.createElement('a'));

          ___run();

          break;

        default:

          return null;

          break;

      }

      /**
       *
       */
      function ___run() {

        // destroy other bootstrap modal eventually active
        ___destroy($('div.modal.bootstrap-modal'));

        _modal.addClass('modal');
        _modal.addClass('bootstrap-modal');

        _modal_header.addClass('modal-header');

        _modal_footer.addClass('modal-footer');

        _modal_body.addClass('modal-body');

        if ( ___checkType( options.body ) == 'object' && body instanceof jQuery ) {
          _modal_body.append(options.body);
        }
        else {
          if ( ___checkType( options.body ) == 'string' ) {
            _modal_body.html(options.body);
          }
          else {
            _modal_body.html(defaults.body);
          }
        }

        if ( ___checkType(options.dismiss) == 'boolean' && options.dismiss === true ) {

          _modal_header_dismisser.attr('type','button');
          _modal_header_dismisser.attr('data-dismiss','modal');
          _modal_header_dismisser.attr('aria-hidden','true');
          _modal_header_dismisser.html('&times;');
          _modal_header_dismisser.addClass('close');

          _modal_footer_dismisser.attr('href','#');
          _modal_footer_dismisser.attr('data-dismiss','modal');
          _modal_footer_dismisser.html(options.dismiss_label);
          _modal_footer_dismisser.addClass('btn');

          _modal_header.append(_modal_header_dismisser);
          _modal_footer.append(_modal_footer_dismisser);

          _modal.modal({
            show:false,
            backdrop:true,
            keyboard:true
          });

        }
        else {

          _modal.modal({
            show:false,
            backdrop:'static',
            keyboard:false
          });

        }

        if ( ___checkType(options.title) == 'string' ) {
          _modal_header_title.html(options.title);
        }
        else {
          _modal_header_title.html(defaults.title);
        }

        if ( jQuery.inArray(options.title_style, title_styles) >= 0 ) {
          _modal_header_title.addClass('text-'+options.title_style);
        }

        if ( ___checkType(options.action) == 'object' ) {
          ___addAction(options.action);
        }
        else {
          if ( ___checkType(options.action) == 'array' ) {
            for ( var i = 0; i < options.action.length; i++ ) {
              ___addAction(options.action[i]);
            }
          }
        }

        _modal_header.append(_modal_header_title);

        _modal.append(_modal_header);
        _modal.append(_modal_body);
        _modal.append(_modal_footer);

        _modal.modal({show:true});

        if ( ___checkType(options.autodismiss) == 'boolean' && options.autodismiss === true ) {

          countdown = 3; // @todo set up a default countdown variable, configurable via options

          setTimeout(
            function(){
              ___destroy(_modal);
            },
            countdown*1000
          );

          if ( ___checkType(options.dismiss) == 'boolean' && options.dismiss === false ) {
            _modal_footer_dismisser.attr('href','#');
            _modal_footer_dismisser.attr('disabled','disabled');
            _modal_footer_dismisser.addClass('btn');
            _modal_footer_dismisser.unbind('click');
            _modal_footer.append(_modal_footer_dismisser);
          }

          _modal_footer_dismisser.html(
            'Autodismiss ('+countdown+')'
          );

          counter = setInterval(function(){___timer();},1000);

        }

        return function(){};

      }

      /**
       *
       */
      function ___timer() {
        countdown = countdown - 1;
        if ( countdown <= 0 ) {
          clearInterval(counter);
          return;
        }
        _modal_footer_dismisser.html('Autodismiss ('+countdown+')');
      }

      /**
       *
       */
      function ___addAction( action ) {

        if ( action == null ) {

          return;

        }
        else {

          if ( ___checkType(action) == 'object' ) {

            if ( action.label ) {

              var _modal_action = $(document.createElement('a'));

              _modal_action.addClass('btn');

              if ( ___checkType(action.style) == 'string' ) {
                if ( jQuery.inArray( action.style, action_styles ) >= 0 ) {
                  _modal_action.addClass('btn-'+action.style);
                }
              }

              _modal_action.html(
                action.label ? action.label : 'Action'
              );

              if ( ___checkType(action.callback) === 'function' ) {
                _modal_action.click(function(){
                  action.callback();
                  ___destroy(_modal);
                });
              }
              else {
                if ( action.href ) {
                  _modal_action.attr('href',action.href);
                }
                else {
                  _modal_action.attr('href','#');
                  _modal_action.attr('data-dismiss','modal');
                }
              }

              _modal_footer.append(_modal_action);

            }

          }

          return;

        }

      }

      /**
       *
       */
      function ___destroy(modal_element){
        modal_element.modal('hide');
        modal_element.modal({show:false});
        modal_element.remove();
      }

    }
  });
})(jQuery);