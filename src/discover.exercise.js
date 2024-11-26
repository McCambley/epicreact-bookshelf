/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {useEffect, useState} from 'react'
import {client} from 'utils/api-client.exercise'
import {danger} from 'styles/colors'
import {FaTimes} from 'react-icons/fa'
import {useAsync} from 'utils/hooks'

function DiscoverBooksScreen() {
  const {isLoading, isError, isSuccess, setError, error, data, run} = useAsync()
  const [query, setQuery] = useState(null)
  const [queried, setQueried] = useState(false)

  useEffect(() => {
    if (!queried) return
    run(client(`books?query=${encodeURIComponent(query)}`))
  }, [queried, query, run])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setError(null)
    setQueried(true)
    const queryValue = event.target.elements.search.value
    setQuery(queryValue)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isError ? (
                <FaTimes aria-label="error" css={{color: danger}} />
              ) : isLoading ? (
                <Spinner />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{color: danger}}>
          <p>There was an error:</p>
          <pre>{error ? error.message : 'Something went wrong'}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
