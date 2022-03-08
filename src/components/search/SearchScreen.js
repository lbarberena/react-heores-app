import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import queryString from 'query-string';
import { useMemo } from 'react';

export const SearchScreen = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const { q = '' } = queryString.parse( location.search );

    const [ formValues, handleInputChange ] = useForm({ searchText: q });

    const { searchText } = formValues;

    const heroesFilter = useMemo( () => getHeroesByName(q), [q] );

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${ searchText }`);
    };

    return (
        <>
            <h1>Searches</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Hero</h4>
                    <hr/>

                    <form onSubmit={ handleSearch }>
                        <input type="text" value={ searchText } onChange={ handleInputChange } placeholder="Search a Hero" className="form-control" name="searchText" autoComplete="off"/>
                    
                        <button className="btn btn-outline-primary mt-1" type="submit">Find</button>
                    </form>
                </div>

                <div className='col-7'>
                    <h4>Result</h4>
                    <hr/>
                    {
                      ( q === '' )
                            ? <div className='alert alert-info'>Search a hero</div>
                            : ( heroesFilter.length === 0 )
                                && <div className='alert alert-danger'>No heroes found: { q }</div> 
                    }

                    {
                      heroesFilter.map( hero => (
                          <HeroCard key={ hero.id } { ...hero }/>
                      ))
                    }  
                </div>
            </div>
        </>
    )
}