# Video Calling With AR Filters

## Requirements
- node v18.7.0
- npm 8.18.0
- Webcam for video functionality
- Microphone
- Dyte developer Account for API Key and Organisation ID


## Running the Sample
1. clone this repository
2. After cloning, we should install all the dependencies using npm by running
```
npm i
```
3. Copy `.env.example` to `.env`
4. Generate an `authToken` using the [create-participant](https://docs.dyte.io/api#/operations/add_participant) API.
5. Create a [Deep AR](https://developer.deepar.ai/) account and obtain license key.
6. Populate `.env` file with the tokens.
7. Once all of the above are done, you can run the project by executing:
```
npm run dev
```

## Useful Terminology and Links
> Note: These terms have been referred to in the following content

- [Dyte Documentation](https://docs.dyte.io): This refers to the Dyte Documentaion for the [web-core](https://docs.dyte.io/web-core) (relating to the core functionality of the sdk) and [react-ui-kit](https://docs.dyte.io/react-ui-kit) (relating to the frontend components and flows of the application).
- [API Reference](https://docs.dyte.io/api#/): This refers to Dyte's API reference where all routes that are available to the user are listed and explained. Dyte's API has to versions of APIs, [v1](https://docs.dyte.io/api/?v=v1) and [v2](https://docs.dyte.io/api/?v=v2) respectively. In this project we have used the v1 API.

## Contributing
We welcome contributions. Feel free to file issues & pull requests on the repo and we'll address them as we can.
For any questions, feedback or suggestions about Dyte, reach out to us directly on our [Discord Community Server](https://community.dyte.io/).

## License
All of Dyte's Sample Apps are Licensed with the MIT License. For more details, view the [LICENSE](./LICENSE).
