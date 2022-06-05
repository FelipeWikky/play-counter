# Play-Counter
#### A mobile application to manage your greens and reds of day.

<small>I'm still learning English, sorry if any text is incorrect. :) </small>

## How to use the app
-  When open the app, you select a day of the month shown in header of screen and can select the green or red button to contabilize.
-  You can define your stop green and red in Configuration option, also, can set your amount per bet and gained value per bet.
-  If you define a stop green/red, the app not allow your contabilizate more greens/reds if you already completed this stop.

## Application information
- This mobile app is a react-native project, using also Expo.
- This app also use typescript for typing the code. <small> The life is more happy with typescrit :)</small>
- Some libraries were fundamental for the app work correctly, for examples:
  - Typescript <small>haha</small>
  - @react-native-async-storage/async-storage: for save all data in local storage of device
  - styled-components: to create the components separated with style standardized
  - date-fns: to format and retrieve dates, months and years
  - @gorhom/bottom-sheet: to use a bottom sheet with a modal style and enjoy the screen better (thank you Rodrigo Gonçalves / Rocketseat for apresentate this library)
  - react-native-responsive-fontsize: to make texts responsive
  * > Some of these libraries need other libraries as dependency


## Features
- You can select a day of the month and it will show the greens and reds of the selected day;
- You can view total of greens and reds of the month in header, below the month name;
- You can define a stop green and stop red for do not exceed the limit;
- You can define the amount per bet and gain per bet to generate a report with gains and loss (not work - yet);
- You can reset count data of greens and reds;
<br/>
- That's it for now.

## How to install
- Clone or download this reposity in your machine;
- Run ```yarn install```or ```npm install``` to download dependencies and packages to run this app;
- Execute ```yarn ios``` or ```yarn android```based in your operation system.

## Git commit messages standardization
- <strong>feat</strong>: can be a creation, addition or implementation of anything
- <strong>fix</strong>: is a correction of any code, logic or feature mistake

<br/>
<br/>
##### With new informations, we will update this readme.