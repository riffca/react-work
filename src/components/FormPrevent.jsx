import * as React from 'react';

interface FormProps {
  /**
   * Automatically prevents the default browser behavior so you don't have to
   */
  onSubmit: () => any;
}
export const Form = ({ onSubmit, children}: FormProps) =>
  <form className={this.props.className}
    onKeyDown={
      (e) => {
        /**
         * Note: Pressing enter in some input in a browser forms
         *  triggers onClick on the first child button
         *
         * So, prevent `enter` from triggering `onClick` on any buttons
         *  and instead trigger onSubmit
         */
        if (e.key === 'Enter') {
          e.preventDefault();
          onSubmit();
        }
      }
    }

    onSubmit={
      (e) => {
        /**
         * Prevent submit from reloading the page
         */
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      }
    }>
    {children}
  </form>