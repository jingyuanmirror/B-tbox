import { useEffect, useRef } from 'react';
import { usePageStore } from '@/store/usePageStore';

interface UseScrollHeaderOptions {
  threshold?: number; // 滚动多少像素后显示标题
  titleElement?: string; // 页面标题元素的选择器
}

export function useScrollHeader({ 
  threshold = 120, 
  titleElement = '[data-page-title]' 
}: UseScrollHeaderOptions = {}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { setShowTitleInHeader } = usePageStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShowInHeader = scrollY > threshold;
      
      // 如果有标题元素引用，检查它是否已经滚出视野
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const isTitleVisible = titleRect.bottom > 64; // 64px is header height
        setShowTitleInHeader(!isTitleVisible && scrollY > 60);
      } else {
        setShowTitleInHeader(shouldShowInHeader);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始检查
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, setShowTitleInHeader]);

  return { titleRef };
}
