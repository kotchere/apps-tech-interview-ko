# Curiosity Stream Take Home Challenge

We have generated a simple list of the top 50 titles according to IMDB in June 2021. There are 500 titles available overall. Your challenge is to take this list of titles and turn it into a UI which allows users to view all 500 titles efficiently and intuitively. We have set some basic expectations and limitations below, but we encourage you to get creative and show off what you can do!

## Expectation

- [ ] Titles should be rendered in an infinitely paginating list
- [ ] It should support two views: list and grid view, which should be responsive and intuitive (don't be afraid to get creative)

## Limitations

- Please do not use class components for this challenge. We prefer to see functional components and hooks
- Please limit your use of third party frameworks/libraries where possible so we can see how you code. ie, React Navigation is okay, but please avoid UI libraries

## Running the Application

```bash
# install application dependencies
npm run postpull

# android
npm run android

# ios
npm run ios
```

You can start editing the app by modifying `App.js`. The app should automatically reload as you edit its contents.

The list of available titles can be accessed via [https://cs-title-fetcher.herokuapp.com/api/titles](https://cs-title-fetcher.herokuapp.com/api/titles?limit=10&offset=20). **The endpoint requires the `offset` and `limit` params to be specified in order to return results.**

## Tests

```bash
npm run test
```

## Additional Information

This challenge uses React Native's 'init' template as its base. If you'd like to learn more, please take a look at the react native developer docs at [reactnative.dev](https://reactnative.dev/).
