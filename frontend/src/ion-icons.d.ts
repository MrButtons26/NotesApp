// src/types/ion-icons.d.ts

declare namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name: string; // This makes the 'name' attribute a string (can be further refined)
        size?: string; // Optional size for the icon
        color?: string; // Optional color for the icon
        class?: string; // Optional class for styling
      };
    }
  }
