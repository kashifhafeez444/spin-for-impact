# Spin For Impact

DUPHAT 2026 — “Spin for Impact”

Interactive ESG Gamified Activation — Frontend Prototype

Create a premium, highly polished, game-like interactive web experience for a DUPHAT 2026 ESG activation called “Spin for Impact.”

This is NOT a traditional corporate website and NOT a basic quiz form.

The experience should feel like a premium arcade/game interface designed for an event activation screen, where visitors interact with a large animated spinning wheel, answer ESG questions, receive instant feedback, and ultimately win a small sustainable plant giveaway.

The website should be designed mobile-first and responsive, because visitors will primarily access it by scanning a QR code on their phones. It should also look excellent on tablets and larger event screens.

1. CORE USER JOURNEY

The complete experience should follow this flow:

WELCOME → REGISTER → SPIN → WHEEL RESULT → QUESTION 1 → QUESTION 2 → RESULT / REWARD

Step 1 — Welcome

Create an exciting game-style landing screen.

Headline:

SPIN FOR IMPACT

Supporting text:

Spin the wheel. Test your ESG knowledge. Make an impact.

Primary CTA:

START THE GAME

Add subtle animated environmental/game elements in the background such as:

Floating leaves

Small particles

Circular energy waves

Sustainability-inspired icons

Soft glowing effects

Animated gradients

The screen should immediately communicate that this is an interactive game.

2. REGISTRATION SCREEN

After clicking START THE GAME, show a short registration screen.

Title:

READY TO SPIN?

Subtitle:

Enter your details to join the challenge.

Fields:

Full Name

Email Address

CTA:

CONTINUE

Frontend validation is enough for now.

Do NOT build backend registration yet.

Structure the code so that registration can later be connected to an API.

3. MAIN GAME SCREEN

After registration, transition into the main game.

The main focus should be a large SPIN FOR IMPACT wheel.

Display the six categories around the wheel:

Greener Healthcare

Waste Wise

Power Smart

Every Drop Counts

Your ESG Move

ESG Challenge

The wheel should visually look like a real game wheel.

Wheel Design

Create six clearly separated segments.

Each segment should have:

Category name

Appropriate sustainability icon

Strong visual contrast

Slight glow

Premium event aesthetic

At the top or side of the wheel, place a fixed pointer indicating where the wheel will stop.

Below the wheel:

SPIN THE WHEEL

Primary button:

SPIN NOW

The button should have a strong game-like appearance with hover/tap animation.

4. WHEEL ANIMATION

The wheel is the main attraction.

When the user clicks SPIN NOW:

Disable the button

Wheel spins rapidly

Add acceleration

Maintain momentum

Gradually slow down

Use realistic easing

Wheel should rotate several complete rotations

Finally stop dramatically on ONE category

Add a short suspense moment before the result is revealed

The final selected category should be determined randomly.

Important:

The wheel contains exactly these six categories.

The selected category must correspond to the actual segment where the wheel visually stops.

Do NOT simply randomly select a category while making the wheel animation appear unrelated.

The wheel's visual rotation and selected category must stay synchronized.

After the wheel stops:

Add a brief glow/pulse around the winning segment

Display a small celebratory animation

Play a winning/selection sound

Show the selected category prominently

Example:

YOU LANDED ON

WASTE WISE

Then CTA:

TAKE THE CHALLENGE

5. SOUND DESIGN

This should feel like a game, not a website.

Add sound effects where appropriate.

Use browser-compatible audio and structure the application so audio assets can easily be replaced later.

Suggested sounds:

Welcome

Subtle ambient background sound.

Start

Short energetic button sound.

Wheel spinning

Continuous ticking/clicking sound while the wheel spins.

The ticking should feel synchronized with the wheel movement if possible.

Wheel stopping

A stronger suspense/release sound.

Correct answer

Positive success sound.

Incorrect answer

Soft negative/buzzer sound, but NOT harsh.

Final reward

Celebratory success sound.

Also include a clearly visible:

🔊 SOUND ON / 🔇 SOUND OFF

control.

Sound should respect browser autoplay restrictions. Do not force audio playback before the user interacts with the page.

Keep all audio implementation modular so actual branded audio files can be added later.

6. QUESTION LOGIC

After the wheel selects a category, randomly select TWO questions from that category's question bank.

Important:

Each category currently has 5 questions.

Only 2 questions should be shown per game session.

The two questions must be randomly selected from the five available questions.

Do NOT repeat the same question within the same game session.

Example:

If the wheel lands on:

POWER SMART

Randomly select 2 questions from the 5 Power Smart questions.

The question order should also be randomized.

7. QUESTION SCREEN

Create a visually exciting quiz/game screen.

At the top:

ESG CHALLENGE

Show:

QUESTION 1 OF 2

Then display the question in a large, highly readable card.

Below it, show four answer options as large interactive buttons.

Example:

Which action can reduce unnecessary workplace energy consumption?

A. Leaving equipment running overnight

B. Switching off unnecessary equipment

C. Keeping unused areas fully lit

D. Cooling empty spaces

Each answer should be a large tap-friendly button.

8. ANSWER INTERACTION

When the visitor selects an answer:

Immediately lock the answer choices.

If correct:

Selected answer becomes visually successful

Show a ✓

Play success sound

Add a short celebration animation

Display:

CORRECT!

Optional micro-message:

Great job! You know your ESG.

Then after a short delay or CTA, move to Question 2.

If incorrect:

Selected answer becomes visually incorrect

Show an ✕

Reveal the correct answer

Play a soft incorrect sound

Display:

NOT QUITE!

Then show:

Correct answer: [answer]

Allow the user to continue.

Do NOT allow the visitor to change their answer after submitting.

9. QUESTION PROGRESS

Make the progress extremely clear.

For example:

QUESTION 1 / 2

and

● ○

Then:

QUESTION 2 / 2

and

● ●

Use subtle animated progress transitions.

10. FINAL RESULT SCREEN

After the second question, show a premium game-result screen.

Possible states:

If the user gets both questions correct:

Large celebration animation.

Headline:

YOU MADE AN IMPACT!

Supporting text:

2 / 2 CORRECT

Then:

Congratulations! You've earned a sustainable plant.

CTA:

COLLECT YOUR PLANT

If the user gets one correct:

Headline:

GOOD JOB!

Supporting text:

1 / 2 CORRECT

Message:

Every action counts. Keep making sustainable choices.

For the prototype, still show the reward state if desired, but structure the logic so the reward eligibility can easily be changed later through the API/business rules.

If the user gets zero correct:

Headline:

KEEP GOING!

Supporting text:

0 / 2 CORRECT

Message:

Every ESG journey starts with one small action.

Then show a motivational sustainability message.

11. REWARD SCREEN

Create a final reward screen for visitors who qualify.

Large visual of a small plant / sustainable plant giveaway.

Headline:

YOUR IMPACT HAS GROWN

Supporting text:

Congratulations! Collect your sustainable plant at the activation desk.

CTA:

DONE

Add subtle leaves, particles and celebratory animation.

The plant should feel like the physical reward of the game.

12. ESG CATEGORY DATA

Create the questions as structured frontend data, NOT hardcoded directly into individual UI components.

Use a structure similar to:

category:

id

name

icon

questions[]

Each question should contain:

question

options

correctAnswer

This is extremely important because the question bank will later be replaced or connected to an API.

13. COMPLETE QUESTION BANK

CATEGORY 1 — GREENER HEALTHCARE

Question 1

Which can help reduce the environmental impact of healthcare operations?

A. Responsible waste management

B. Energy efficiency

C. Sustainable procurement

D. All of the above

Correct answer: D

Question 2

True or False:

Sustainability in healthcare only concerns the disposal of medical waste.

A. True

B. False

Correct answer: False

Question 3

Which is an example of sustainable procurement in healthcare?

A. Choosing suppliers based only on speed

B. Considering environmental impact alongside quality and commercial requirements

C. Always choosing the cheapest product

D. Replacing equipment as frequently as possible

Correct answer: B

Question 4

Which action can support a more sustainable healthcare facility?

A. Reducing unnecessary energy consumption

B. Managing waste responsibly

C. Conserving water

D. All of the above

Correct answer: D

Question 5

True or False:

Healthcare organisations can pursue sustainability while still prioritising patient safety and quality.

A. True

B. False

Correct answer: True

CATEGORY 2 — WASTE WISE

Question 1

Which generally comes before recycling in the waste hierarchy?

A. Disposal

B. Reducing and reusing

C. Landfill

D. Incineration

Correct answer: B

Question 2

True or False:

Everything placed in a recycling bin will automatically be recycled.

A. True

B. False

Correct answer: False

Question 3

What is e-waste?

A. Food waste

B. Paper packaging

C. Discarded electrical and electronic equipment

D. Wastewater

Correct answer: C

Question 4

If an item can safely be reused rather than replaced, which is generally the more sustainable option?

A. Throw it away

B. Reuse it

C. Replace it immediately

D. Store it indefinitely

Correct answer: B

Question 5

What is the main idea behind a circular economy?

A. Produce, use and dispose

B. Keep products and materials in use for as long as possible

C. Recycle everything once

D. Stop manufacturing products

Correct answer: B

CATEGORY 3 — POWER SMART

Question 1

Which action can reduce unnecessary workplace energy consumption?

A. Leaving equipment running overnight

B. Switching off unnecessary equipment

C. Keeping unused areas fully lit

D. Cooling empty spaces

Correct answer: B

Question 2

True or False:

LED lighting generally consumes less electricity than traditional incandescent lighting.

A. True

B. False

Correct answer: True

Question 3

Which building system can automatically help manage lighting and air-conditioning efficiently?

A. CRM

B. GPS

C. Building Management System (BMS)

D. POS system

Correct answer: C

Question 4

Which behaviour wastes energy?

A. Using occupancy-controlled lighting

B. Maintaining equipment efficiently

C. Cooling an unoccupied room unnecessarily

D. Switching equipment off when not required

Correct answer: C

Question 5

True or False:

Small energy-saving actions can contribute to reducing an organisation’s overall environmental footprint.

A. True

B. False

Correct answer: True

CATEGORY 4 — EVERY DROP COUNTS

Question 1

Which is an effective way to reduce unnecessary water consumption?

A. Increasing water pressure

B. Installing water-efficient fixtures

C. Leaving taps running

D. Watering regardless of need

Correct answer: B

Question 2

True or False:

A leaking tap can contribute to unnecessary water consumption over time.

A. True

B. False

Correct answer: True

Question 3

Which irrigation method can help use water more efficiently?

A. Flood irrigation

B. Drip irrigation

C. Leaving sprinklers continuously running

D. Increasing water pressure

Correct answer: B

Question 4

What does water conservation mean?

A. Never using water

B. Using water responsibly and avoiding unnecessary waste

C. Only drinking bottled water

D. Increasing water storage

Correct answer: B

Question 5

True or False:

Water efficiency is relevant to businesses as well as households.

A. True

B. False

Correct answer: True

CATEGORY 5 — YOUR ESG MOVE

Question 1

You're at an event and need water throughout the day. Which is generally the more sustainable choice?

A. Take a new disposable bottle each time

B. Use and refill a reusable bottle

C. Use several disposable cups

D. Avoid drinking water

Correct answer: B

Question 2

Four colleagues are travelling to the same destination. Which option can reduce transport emissions per person?

A. Four separate cars

B. Carpooling

C. Taking longer individual routes

D. Leaving at different times

Correct answer: B

Question 3

You receive a document that only needs reviewing. What should you do?

A. Print several copies

B. Review it digitally

C. Print one copy for everyone

D. Print every email attachment

Correct answer: B

Question 4

Your phone or laptop reaches the end of its useful life. What is generally the better option?

A. Put it in general waste

B. Leave it in a drawer forever

C. Use an approved e-waste recycling or recovery programme

D. Throw it away with food waste

Correct answer: C

Question 5

You're buying takeaway coffee every morning. Which habit can reduce single-use waste?

A. Ask for two cups

B. Use a reusable cup where accepted

C. Take additional lids

D. Use a new cup for every refill

Correct answer: B

CATEGORY 6 — ESG CHALLENGE

Question 1

What does ESG stand for?

A. Energy, Sustainability & Growth

B. Environmental, Social & Governance

C. Environmental, Safety & Growth

D. Ethics, Sustainability & Governance

Correct answer: B

Question 2

Which belongs primarily to the Environmental pillar?

A. Employee wellbeing

B. Business ethics

C. Energy efficiency

D. Whistleblower protection

Correct answer: C

Question 3

Which belongs primarily to the Social pillar?

A. Carbon emissions

B. Employee health and wellbeing

C. Energy consumption

D. Anti-bribery controls

Correct answer: B

Question 4

Which belongs primarily to Governance?

A. Recycling

B. Water efficiency

C. Carpooling

D. Business ethics and anti-bribery controls

Correct answer: D

Question 5

Which statement best describes ESG?

A. It only concerns climate change

B. It is another word for recycling

C. It considers environmental, social and governance factors in how an organisation operates

D. It only applies to large industrial companies

Correct answer: C

14. DESIGN DIRECTION

The visual design should feel like a premium sustainability game created for a major international healthcare exhibition.

Avoid making it look like:

A normal corporate website

A Google Form

A generic quiz app

A basic spinning wheel template

A children's game

It should feel:

Premium + Futuristic + Playful + Sustainable + Healthcare + Exhibition-ready

Use:

Modern typography

Large typography

Rounded cards

Glassmorphism where appropriate

Soft gradients

Glow effects

Particle effects

Smooth transitions

Micro-interactions

Animated icons

Large touch-friendly controls

Use a sophisticated ESG-inspired visual language.

Possible visual direction:

Deep green + fresh green + teal + warm natural tones + subtle off-white

Do not overuse gradients.

Maintain strong contrast and accessibility.

15. GAME-LIKE ANIMATIONS

Use animations throughout the experience.

Examples:

Page transitions

Button hover/tap effects

Wheel spinning

Winning segment pulse

Question card entrance

Answer selection animation

Correct-answer celebration

Progress animation

Floating environmental particles

Leaves drifting subtly in the background

Reward celebration

Plant reveal animation

Animations should feel smooth and premium rather than childish.

Use appropriate animation libraries if useful, such as Framer Motion.

16. RESPONSIVE DESIGN

The main target is mobile.

The interface must work beautifully on:

iPhone

Android phones

Tablets

Desktop

Large exhibition displays

On mobile:

Wheel should remain large enough to interact with comfortably

Question options should be large touch targets

No horizontal scrolling

Text must remain readable

CTA buttons should be easy to reach

Keep important game information visible without unnecessary scrolling

17. APPLICATION ARCHITECTURE

Build the project as a proper frontend application with reusable components.

Suggested components:

WelcomeScreen

RegistrationScreen

GameScreen

SpinWheel

CategoryResult

QuestionScreen

AnswerOption

ProgressIndicator

ResultScreen

RewardScreen

SoundToggle

BackgroundEffects

Keep game state centralized.

Example state:

currentScreen

user

selectedCategory

selectedQuestions

currentQuestionIndex

score

gameStarted

wheelSpinning

answered

gameCompleted

soundEnabled

18. RANDOMIZATION RULES

When a game starts:

User registers.

User enters the game.

User spins the wheel.

Wheel randomly selects one of six categories.

Once the category is selected, randomly choose exactly TWO questions from that category's five-question bank.

Do not repeat a question in the same session.

Display Question 1.

Display Question 2.

Calculate the score.

Show final result.

Show reward state if eligible.

Do not select the questions before the wheel category is known.

19. FRONTEND ONLY — VERY IMPORTANT

This is currently a frontend prototype.

DO NOT implement:

Firebase

Database

Authentication

Real API calls

Backend

Admin panel

External registration system

External reward system

However, structure the code so these can easily be added later.

Use mock/local frontend data for now.

Create clear functions/services where API integration can later be inserted.

For example:

registerParticipant()

saveGameResult()

getQuestions()

submitAnswer()

claimReward()

For now these can use mock/local data.

20. FUTURE API INTEGRATION

The client will later provide an API.

Therefore, do not tightly couple the UI to static data.

Create a clean data layer such as:

services/gameService

The frontend should be able to eventually replace:

mockGameService

with:

apiGameService

without redesigning the UI.

21. GAME RESET

After completing the experience, provide an option to:

PLAY AGAIN

This should reset:

Selected category

Questions

Score

Question progress

Answer states

Wheel state

Then return the user to the wheel or registration flow depending on the intended UX.

22. IMPORTANT UX DETAILS

Add a small persistent game header containing:

SPIN FOR IMPACT

and a sound toggle.

Avoid excessive navigation.

This is a single-purpose activation experience.

The visitor should always know:

What they are doing

What stage they are in

What they need to tap next

The experience should be achievable quickly at an exhibition booth.

Aim for approximately:

1–2 minutes per participant.

23. FINAL QUALITY REQUIREMENT

The final result should look like a real production-ready interactive event activation, not an AI-generated template.

Prioritize:

Beautiful visual design

Strong game feeling

Excellent wheel animation

Smooth transitions

Sound feedback

Clear question experience

Mobile responsiveness

Clean component architecture

Easy future API integration

Premium healthcare exhibition aesthetic

Make the wheel the hero of the experience.

The overall emotional journey should feel like:

“I want to spin it → What did I land on? → Can I answer it? → I got it! → I won a plant!”

Build the complete frontend experience now with all six categories and all 30 questions included.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/354b7dbe-2f63-4a85-985a-866ab625d1f1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
