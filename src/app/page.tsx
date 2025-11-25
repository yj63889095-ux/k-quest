import styles from './coming-soon.module.css'

export default function ComingSoonPage() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.icon}>🔧</div>

        <h1 className={styles.title}>K-Quest</h1>

        <p className={styles.subtitle}>서비스 준비중</p>
        <p className={styles.subtitleEn}>Coming Soon</p>

        <div className={styles.description}>
          <p>프리미엄 한국 체험 플랫폼을 준비하고 있습니다.</p>
          <p style={{ color: '#777', marginTop: '10px' }}>We are preparing a premium Korean experience platform.</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.businessInfo}>
          <h2>사업자 정보</h2>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>상호명</span>
            <span className={styles.infoValue}>K-Quest</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>대표자</span>
            <span className={styles.infoValue}>박세희</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>사업자등록번호</span>
            <span className={styles.infoValue}>발급 예정</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>통신판매업 신고번호</span>
            <span className={styles.infoValue}>신청 중</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>이메일</span>
            <span className={styles.infoValue}>contact@quest-k.com</span>
          </div>
        </div>

        <div className={styles.footer}>
          <p>© 2025 K-Quest. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
