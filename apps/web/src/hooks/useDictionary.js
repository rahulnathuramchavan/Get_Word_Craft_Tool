import { useCallback, useEffect, useState } from 'react';
import { loadDictionary } from '@/lib/dictionary';

export default function useDictionary() {
  const [state, setState] = useState({ status: 'loading', dict: null, error: '' });

  const start = useCallback(() => {
    setState({ status: 'loading', dict: null, error: '' });
    let alive = true;
    loadDictionary()
      .then((dict) => { if (alive) setState({ status: 'ready', dict, error: '' }); })
      .catch((e) => {
        if (alive) {
          setState({
            status: 'error',
            dict: null,
            error: e?.message || 'The word list could not be loaded. Check your connection and try again.',
          });
        }
      });
    return () => { alive = false; };
  }, []);

  useEffect(() => start(), [start]);

  return { ...state, retry: start };
}
