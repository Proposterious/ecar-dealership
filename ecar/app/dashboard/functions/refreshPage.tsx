import { useRouter } from 'next/navigation';

export function refreshPage() {
    const router = useRouter();
    router.refresh();
}