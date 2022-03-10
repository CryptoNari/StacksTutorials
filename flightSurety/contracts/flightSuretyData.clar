
;; flightSuretyData
;; <add a description here>

;; constants
;;

(define-constant CONTRACT_OWNER tx-sender)

(define-constant ERR_UNAUTHORIZED u6001)
;; contract states
(define-constant STATE_ACTIVE u0)
(define-constant STATE_INACTIVE u1)

(define-data-var operational bool true)

;; data maps and vars
;;

;; private functions
;;

;; public functions
;;
(define-read-only (is-operational)
  (var-get operational)
)

(define-public (set-operational-status (status bool))
  (ok (var-set operational status))
)

(define-public (check-authorized)
  (ok (asserts! (is-eq tx-sender CONTRACT_OWNER) (err ERR_UNAUTHORIZED)))
)

(define-read-only (get-caller)
(ok contract-caller)
)

(define-read-only (get-sender)
(ok tx-sender)
)