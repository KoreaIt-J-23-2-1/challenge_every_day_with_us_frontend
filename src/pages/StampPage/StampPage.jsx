import BaseLayout from '../../components/BaseLayout/BaseLayout';
import StampCalendar from '../../components/StampCalendar/StampCalendar';
import TitleComponent from '../../components/TitleComponent/TitleComponent';


function StampPage(props) {
    

    return (
        <BaseLayout>
            <TitleComponent title="출석체크 시 50 포인트를 지급합니다 !" />
            <StampCalendar />
        </BaseLayout>
    );
}

export default StampPage;