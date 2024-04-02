import { ThemeApp } from "../App";
import HomePage from "../components/HomePage";

export default {
    title: 'HomePage',
    component: HomePage
}

export const NoTheme = () => <HomePage />;
export const Themed = () => <ThemeApp />;