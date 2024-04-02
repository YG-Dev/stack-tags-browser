import { CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TagsSortableTable from './TagsSortableTable';
import useDebouncedValue from '../hooks/useDebouncedValue';
import axios from 'axios';
import { getErrorMessage } from '../utils/get-error-message';
import ErrorInfoBox from './ErrorInfoBox';

export interface TagItems {
    items: TagItem[];
}

export interface TagItem {
    count: number;
    has_synonyms: boolean;
    is_moderator_only: boolean;
    is_required: boolean;
    name: string;
}

function HomePage() {
    const [inputValue, setInputValue] = useState('20'); // Display 20 tags on default
    const debouncedInputTerm = useDebouncedValue(inputValue, 500);
    const [tagItems, setTagItems] = useState<TagItems>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState<string | null>(null);

    const callTags = async (amount: string) => {
        setIsLoading(true);
        try {
            await axios
            .get('https://api.stackexchange.com/tags', {
                params: {
                    pagesize: amount || '0', // If the value is empty string, show 0 rows
                    order: 'desc',
                    sort: 'name',
                    site: 'stackoverflow'
                }
            })
            .then((res) => {
                setErrorData(null);
                setTagItems({
                    items: res.data.items
                });
            })
            .catch((err) => {
                console.log(err.response.data)
                setErrorData(getErrorMessage(err.response.data.error_name || null, err.response.data.error_id || 0));
            })
            .finally(() => setIsLoading(false));
            
        } catch (err) {
            setErrorData(getErrorMessage(err instanceof Error ? err.message : null));
            setIsLoading(false);
        }
    };

    useEffect(() => {
        callTags(debouncedInputTerm);
      }, [debouncedInputTerm]); // After value debounce, fetch results by ID
    
    return (
        <Container sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: '#121212' }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingTop: '2em' }} >
                <Typography variant="h2" component="h1" color={'#fff'} align='center' marginBottom={'.5em'}>
                    Stack Overflow tags browser
                </Typography>
                <Typography variant="subtitle1" component="p" color={'#fff'} align='justify' marginBottom={'2em'}>
                    This is the Single Page Application that allows user to fetch and display Stack Overflow tags. Simply type in an integer number in the input field down below, and it will display specified amount of tags in the paginated, sortable table. Be mindful that maximum number of fetched tags is <strong>100</strong>.
                </Typography>
                <TextField
                    type="number"
                    label="Number of tags displayed"
                    variant="outlined"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    inputProps={{
                        min: 0,
                        step: 1
                    }}
                    sx={{ marginBottom: '3em' }}
                />
                
                {
                    isLoading && <CircularProgress sx={{
                        minWidth: '200px',
                        minHeight: '200px',
                        margin: 'auto',
                        marginTop: '1em',
                        marginBottom: '1em'
                    }}/>
                }
                {
                    !isLoading && errorData &&
                    <ErrorInfoBox message={errorData} />
                }
                {
                    !isLoading && !errorData && tagItems &&
                    <TagsSortableTable {...tagItems} />
                }
            </Container>
        </Container>
      );
}

export default HomePage;