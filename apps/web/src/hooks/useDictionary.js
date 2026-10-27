import { useCallback, useEffect, useState } from 'react';
import { loadDictionary } from '@/lib/dictionary';

export default function useDictionary({ lazy = false } = {}) {
  const [state, setState] = useState(() => ({
    status: lazy ? 'idle' : 'loading',
    dict: null,
    error: '',
  }));

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

  useEffect(() => {
    if (!lazy) return start();
  }, [lazy, start]);

  return { ...state, retry: start, load: start };
}

