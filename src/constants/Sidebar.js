export const items = [
   {
      title: "General",
      childrens: [
         {
            title: "Home",
            path: "home",
         },
         {
            title: "About",
            path: "support",
         },
      ],
   },
   {
      title: "Account",
      childrens: [
         {
            title: "Make an Appointment",
            path: "/users/appointment",
         },
         {
            title: "Login",
            path: "/login",
         },
         {
            title: "Register",
            path: "/register",
         },
         {
            title: "Forgot Password",
            path: "/forgot-password",
         },
         {
            title: "Reset Password",
            path: "/reset-password",
         },
      ],
   },
   {
      title: "Profile",
      childrens: [
         {
            title: "Profile",
            path: "/profile",
         },

         {
            title: "Logout",
            path: "/logout",
         },
      ],
   },
   {
      title: "Advance",
      childrens: [
         {
            title: "Search",
            path: "/search",
         },
         {
            title: "History",
            path: "/history",
         },
      ],
   },
];

export const homeAdmin = [
   {
      title: "Doctors Information",
      path: "/doctors/profile",
   },
   {
      title: "Medicine Information",
      path: "/medicine",
   },
   {
      title: "History",
      path: "/history",
   },
];

export const homeUser = [
   {
      title: "Users Information",
      path: "/profile",
   },
   {
      title: "Doctors Information",
      path: "/doctors/profile",
   },
   {
      title: "Schedule",
      path: "/schedule",
   },
];

export const homeDoctor = [
   {
      title: "Doctors Information",
      path: "/profile",
   },
   {
      title: "Patients Information",
      path: "/patients/profile",
   },
   {
      title: "Schedule",
      path: "/schedule",
   },
   {
      title: "Patient Schedule",
      path: "/patient/schedule",
   },
];
