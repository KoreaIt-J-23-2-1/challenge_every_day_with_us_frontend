import BaseLayout from '../../components/BaseLayout/BaseLayout';
import StampCalendar from '../../components/StampCalendar/StampCalendar';
import TitleComponent from '../../components/TitleComponent/TitleComponent';


function StampPage(props) {
    

    return (
        <BaseLayout>
            <TitleComponent title="출석체크 !" />
            <StampCalendar />
        </BaseLayout>
    );
}

export default StampPage;