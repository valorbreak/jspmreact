// Load Assets
import WebFont from 'webfontloader';
import 'jspm_packages/github/twbs/bootstrap@3.3.4/css/bootstrap.css!';
import './styles/style.css!';

export function bootstrap() {

    // Scoped Variables
    let myVar = 'Scoped Variables';

    // Immutable variables
    const immutableVar = 'I can\'t be changed';

    // Arrow Functions
    let newMap = (x) => (x*2);

    WebFont.load({
        google: {
            families: ['Open Sans', 'Droid Serif']
        },
        timeout: 2000 // Set the timeout to two seconds
    });

    console.log('im bootstrapping');
    console.log(immutableVar,'Immutable Variables');
    console.log(myVar,'Scoped Variable');
    console.log(newMap(5),'New Maps, Neat!');
}
