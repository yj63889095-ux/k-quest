import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * 직거래 방지 필터링 시스템 (비용 0원, 강력 모드)
 * 채팅 메시지나 게시글에서 연락처 교환 시도를 감지합니다.
 */
export const AntiFraud = {
    // 금지 패턴 정의 (강력 모드)
    patterns: {
        // 전화번호: 010-1234-5678, 010 1234 5678, 0 1 0 1 2 3 4 등 변칙 허용
        // 숫자 사이에 공백이나 특수문자가 있어도 잡아냄
        phone: /(0\s*1\s*[016789]|0\s*2|0\s*[3-9]\s*[0-9])[\s.-]*([0-9]\s*){3,4}[\s.-]*([0-9]\s*){4}/g,

        // 이메일: 기본 패턴 유지 (이메일은 변칙이 어려움)
        email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,

        // SNS: "카 톡", "k a k a o" 등 띄어쓰기 꼼수 차단
        // 한글/영문 키워드 사이에 공백이 있어도 잡아냄
        sns: /([카k]\s*[톡t]|[카k]\s*[카k]\s*[오o]|[k]\s*[a]\s*[k]\s*[a]\s*[o]|[라l]\s*[인i]|[l]\s*[i]\s*[n]\s*[e]|[텔t]\s*[레l]|[t]\s*[e]\s*[l]\s*[e]|[위w]\s*[챗c]|[w]\s*[e]\s*[c]\s*[h]\s*[a]\s*[t]|[인i]\s*[스s]\s*[타t]|[i]\s*[n]\s*[s]\s*[t]\s*[a])/gi,

        // 계좌번호: 10자리 이상 연속된 숫자 (하이픈 포함)
        account: /([0-9][\s-]*){10,14}/g
    },

    /**
     * 메시지에 금지된 내용이 있는지 검사합니다.
     * @returns 감지된 금지어 타입 (없으면 null)
     */
    detect: (text: string): 'phone' | 'email' | 'sns' | 'account' | null => {
        if (AntiFraud.patterns.phone.test(text)) return 'phone';
        if (AntiFraud.patterns.email.test(text)) return 'email';
        if (AntiFraud.patterns.sns.test(text)) return 'sns';
        if (AntiFraud.patterns.account.test(text)) return 'account';
        return null;
    },

    /**
     * 메시지에서 금지된 내용을 마스킹(***) 처리합니다.
     */
    mask: (text: string): string => {
        let masked = text;
        masked = masked.replace(AntiFraud.patterns.phone, '***-****-**** (보안)');
        masked = masked.replace(AntiFraud.patterns.email, '*****@***.** (보안)');
        masked = masked.replace(AntiFraud.patterns.sns, '$1 *** (보안)');
        masked = masked.replace(AntiFraud.patterns.account, '****-**** (보안)');
        return masked;
    },

    /**
     * 경고 메시지 반환
     */
    getWarningMessage: (type: 'phone' | 'email' | 'sns' | 'account'): string => {
        switch (type) {
            case 'phone':
                return "🚫 전화번호 공유는 금지되어 있습니다. 앱 내 채팅을 이용해주세요.";
            case 'email':
                return "🚫 이메일 공유는 금지되어 있습니다.";
            case 'sns':
                return "🚫 외부 메신저(카톡 등) 유도는 제재 대상입니다.";
            case 'account':
                return "🚫 계좌번호 공유는 위험합니다. 안전결제를 이용해주세요.";
            default:
                return "";
        }
    }
};
