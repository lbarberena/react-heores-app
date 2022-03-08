import { useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {
    const navigate = useNavigate();

    const { heroId } = useParams();

    const hero = useMemo( () => getHeroById( heroId ), [heroId]);

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero;

    if ( !hero ) return <Navigate to="/"/>;

    const imgPath = `/assets/${ id }.jpg`;

    const handleReturn = () => {
        navigate( -1 );
    };

    return (
        <div className='row mt-5'>
            <div className='col-4'>
                <img src={ imgPath } className="img-thumbnail animate__animated animate__fadeInLeft" alt={ superhero }/>
            </div>

            <div className='col-8 animate__animated animate__fadeIn'>
                <h3>{ hero.superhero }</h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><b>Alter ego: </b>{ alter_ego }</li>
                    <li className='list-group-item'><b>Publisher: </b>{ publisher }</li>
                    <li className='list-group-item'><b>First Appearance: </b>{ first_appearance }</li>
                </ul>

                <h5 className='mt-3 animate__animated animate__fadeIn'>Characters</h5>
                <p>{ characters }</p>

                <button className='btn btn-outline-primary' onClick={ handleReturn }>Go Back</button>
            </div>
        </div>
    )
}
