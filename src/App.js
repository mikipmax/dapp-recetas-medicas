import AppRouter from "./routes/AppRouter";
import AppProvider from "./contexts/AppProvider";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <AppProvider>
                <AppRouter/>
            </AppProvider>
            <Footer autor="Michael Ponce"/>
        </>
    );
}

export default App;