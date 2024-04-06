

## API Manager

API Manager is a web application that provides a graphical user interface (GUI) for managing API routes without the need for coding. With this application, users can easily post JSON data and configure API routes effortlessly.

## Features

- **Graphical User Interface (GUI):** Users can interact with the application through a user-friendly interface, eliminating the need for coding skills.
- **Post JSON Data:** Users can post JSON data without writing any code, making it easy to configure API routes.
- **Dynamic Route Setup:** API routes are dynamically configured based on the data posted by users, allowing for flexible and customizable configurations.
- **MongoDB Integration:** API Manager integrates with MongoDB to store and retrieve route data efficiently.
## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/NGamerHere/APIManager.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure MongoDB connection:

    Update the MongoDB connection URI in the `mongoose.connect()` function call in `app.js` to connect to your MongoDB database.

## Usage

1. Start the server:

    - **Linux:**
    
        ```bash
        npm start
        ```

    - **Windows:**
    
        Due to performance issues with nodemon on Windows, it's recommended to use `node` instead of `nodemon` for starting the server. Open `app.js` and replace `nodemon` with `node` in the command below:
        
        ```bash
        node app.js
        ```

2. Access the application:

    Open your web browser and navigate to `http://localhost:4000`.

3. Use the GUI:

    - Post JSON data: Enter the route name and JSON data in the provided fields and submit the form.
    - Configure API routes: The application dynamically sets up API routes based on the data posted by users. Routes can be accessed at `/api/<route_name>`.



## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides an overview of your API Manager application, including installation instructions, usage guidelines, contribution guidelines, and licensing information. Feel free to customize it further based on your specific requirements and preferences.
