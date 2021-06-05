import {
    Fragment,
    useEffect,
    useState
} from "react";
import {
    Button
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import App from "./content";
import dynamic from 'next/dynamic';

const DynamicComp = dynamic(() => import('./content'));
function Counter() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + step);
        }, 1000);
        return () => clearInterval(id);
    }, [step]);

    return(
        <Fragment>
            <h1>{count}</h1>
            <input value={step} onChange={e => setStep(Number(e.target.value))} />
            <DynamicComp/>
        </Fragment>
    )
}
export default Counter;