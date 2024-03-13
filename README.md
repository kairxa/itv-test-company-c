## Video walkthrough

https://github.com/kairxa/carepatron/assets/7877242/fb013667-4818-4a27-a6f0-0dccd185c09c

## Screenshots

![image](https://github.com/kairxa/carepatron/assets/7877242/eca72f23-bace-4280-8665-a054738581f1)

We do not load the list if the search field is empty. Considering this is a list of registered clients, usually we already know our client's details before opening this page. Therefore, it saves a roundtrip to BE and reduces unnecessary/unused DB queries.

![image](https://github.com/kairxa/carepatron/assets/7877242/78c965fd-2caf-40a3-a670-dc009e6e0e94)
![image](https://github.com/kairxa/carepatron/assets/7877242/5771a334-205f-464d-bf61-7afb3f07ff84)
![image](https://github.com/kairxa/carepatron/assets/7877242/0ecef5ae-9bb0-4e95-95cb-1abe07c76daf)

Searching with letters defaults to the firstName and lastName query, as shown in the screenshot. We also have pagination just in case multiple clients have the same name. Not shown here, we have a maximum allowed pagination page (currently set to 50) since our query imitates OFFSET. If that's the case, there is a notification to refine the search keyword, which brings us to the next section.

![image](https://github.com/kairxa/carepatron/assets/7877242/283f3fa0-fa8f-4cdd-9376-d76484571cb9)
![image](https://github.com/kairxa/carepatron/assets/7877242/5e0e63f1-b6c8-4421-8601-7b7ab77ba5ea)

Users can also search for the client via their phone number and email. Usually, phone numbers and emails are unique inside the database. When entering the phone number or email, the query result will be more precise. However, I read somewhere that indexing will be better if at least the search keyword uses the first characters of the string. If that's the case, we can add limitations easily to conform to such requirements.

![image](https://github.com/kairxa/carepatron/assets/7877242/e6ccb86e-26e1-499a-8aa6-5388a79e2c1a)
![image](https://github.com/kairxa/carepatron/assets/7877242/17ab3119-eeb4-428b-9d7a-6301235a10a8)
![image](https://github.com/kairxa/carepatron/assets/7877242/772f8018-096c-4c5f-9092-c8c246ee7afb)
![image](https://github.com/kairxa/carepatron/assets/7877242/adb427b7-e9fd-4377-a425-9b2aa68139c7)
![image](https://github.com/kairxa/carepatron/assets/7877242/7ef63adf-e7ef-4433-a893-86e5375e33a5)
![image](https://github.com/kairxa/carepatron/assets/7877242/006933e1-c001-4daf-b662-939c48c622d3)
![image](https://github.com/kairxa/carepatron/assets/7877242/8c386b12-afcb-4e9c-a3ab-03ed247b9c11)
![image](https://github.com/kairxa/carepatron/assets/7877242/1a424c5b-21c2-43c9-bef1-70bc110898fc)
![image](https://github.com/kairxa/carepatron/assets/7877242/bcc08c02-fa5c-4179-8fd3-c3435d48b2b1)

Create client dialog. All fields are required, alongside some validations for email and phone numbers.

![image](https://github.com/kairxa/carepatron/assets/7877242/1600f06d-77eb-48cf-8079-95e3e7111cde)

We can also change the locale with a click of a button.

![image](https://github.com/kairxa/carepatron/assets/7877242/e4b06d6b-21ff-43d4-ab7d-d710af7096f3)
![image](https://github.com/kairxa/carepatron/assets/7877242/3a651cde-01bb-41d1-8f87-dd8ecd76946b)

Smaller screen views. It's always difficult to view tabular data inside the phone screen width.

## Relevant Notes

1. If time wasn't a constraint what else would you have done?

I'd like to put more thoughts into typings and interfaces. My current approach to them is prototyping mode, so I think they look kind of messy. I would also like to do the backend part, as I've never touched C# before. I also want to try remaking this application in C# + HTMX combo, as lately I found that going back to the roots feels like a breeze compared to the complexity of modern JS frameworks.

2. How was this test overall? I.e too hard, too easy, how long it took, etc

Overall, the test is what I wanted from an interview. It reflects the majority of front-end tasks in a real working environment. It helps the candidate to see what is expected from them when they work in Carepatron. I can also see that the colleagues in Carepatron are actual developers who are in touch with the reality of the working environment. In regards to how long it took, this test took me around 3.5 work days to do, so I'd say the difficulty is quite right.

## Extras explanations

2. a. If you needed to change something in the future (size/color of buttons), how easy would it be?  
   This is my first time using MUI. I do not know yet what their best practices are, and it was kinda confusing since on some components they offer multiple ways to style it. For example, some components have a specific width prop while also enabling sx prop. I need more time to consider which one is better, but in case of quick changes, it is easy since we are using either their built-in props or CSS values inside sx prop.

3. b. How is state managed as the codebase grows?  
   I am not a big fan of global state management. Several years ago, this caused multiple headaches and also difficulty in testing at the company I worked in. It also made the codebase very unwieldy and everyone was afraid to make changes. Referencing where the state was used was also a nightmare. Therefore, a scope-limited context/state is preferable. We still have a global state, but that's for globally-accessed components like locale or alert.

4. How can you ensure the app behaves as you intend it to?  
   Sufficient testing is needed. I included Playwright as my testing framework, as I found using jest (and its related libraries) causes a lot of headaches in boilerplate. Not to mention because we want to emulate the browser's behaviors, we need to write codes for that as well. For example, one thing that confuses me and some of my friends the most is timer management. In jest, we need to add `jest.useFakeTimers` and call manually `jest.runAllTimers`, and more often than not question why the test still does not work properly. Using Playwright (or a similar test framework like Cypress), because it uses real browsers and actual behaviors, this is not an issue. Tests become fun to write and easier to understand as well.

5. How intuitive is the behavior of the app?  
   I am not a good UI/UX designer. For example, I don't think it's clear enough for users to know that they can input phone numbers or emails instead of the client's name. However, the field is not long enough to include a placeholder highlighting that point. So on that point, I don't think it's that intuitive. However, on another part, it is quite clear that we need to search first before seeing the list of clients because an empty message is written in the table. When creating a new client, it is also easy to use because there are indicators about the validity of the fields.
