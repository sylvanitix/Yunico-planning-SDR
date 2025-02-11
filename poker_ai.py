import cv2
import numpy as np
from ultralytics import YOLO
import poker

class PokerAI:
    def __init__(self):
        # Charger le modèle YOLO pré-entraîné
        self.model = YOLO('yolov8n.pt')
        
        # Initialiser la capture vidéo (0 pour la webcam par défaut)
        self.cap = cv2.VideoCapture(0)
        
    def detect_cards(self, frame):
        """Détecte les cartes dans l'image en utilisant YOLO"""
        results = self.model(frame)
        return results
    
    def process_frame(self):
        """Capture et traite une frame de la caméra"""
        ret, frame = self.cap.read()
        if not ret:
            return None
        
        # Détecter les cartes
        detections = self.detect_cards(frame)
        
        # Afficher les détections
        annotated_frame = results[0].plot()
        cv2.imshow("Poker AI", annotated_frame)
        
        return detections
    
    def evaluate_hand(self, cards):
        """Évalue la main de poker"""
        # TODO: Implémenter l'évaluation de la main
        pass
    
    def make_decision(self, hand, pot_odds):
        """Prend une décision de jeu basée sur la main et les probabilités"""
        # TODO: Implémenter la logique de décision
        pass
    
    def run(self):
        """Boucle principale"""
        try:
            while True:
                detections = self.process_frame()
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
                    
        finally:
            self.cap.release()
            cv2.destroyAllWindows()

if __name__ == "__main__":
    poker_ai = PokerAI()
    poker_ai.run()
