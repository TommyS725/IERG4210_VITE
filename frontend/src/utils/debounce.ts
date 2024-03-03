


export default function debounce<F extends (...args: any[]) => any>(func: F, delay: number): (...args: Parameters<F>) => void {
    let debounceTimer:Timer;
    return (...args: Parameters<F>) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  }