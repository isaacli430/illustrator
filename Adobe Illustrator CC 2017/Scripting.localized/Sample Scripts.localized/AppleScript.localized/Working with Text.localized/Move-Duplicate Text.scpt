FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2005-2010 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior 
written permission of Adobe. 

********************************************************     � 	 	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 
 A D O B E   S Y S T E M S   I N C O R P O R A T E D   
 C o p y r i g h t   2 0 0 5 - 2 0 1 0   A d o b e   S y s t e m s   I n c o r p o r a t e d   
 A l l   R i g h t s   R e s e r v e d   
 
 N O T I C E :     A d o b e   p e r m i t s   y o u   t o   u s e ,   m o d i f y ,   a n d   
 d i s t r i b u t e   t h i s   f i l e   i n   a c c o r d a n c e   w i t h   t h e   t e r m s 
 o f   t h e   A d o b e   l i c e n s e   a g r e e m e n t   a c c o m p a n y i n g   i t .     
 I f   y o u   h a v e   r e c e i v e d   t h i s   f i l e   f r o m   a   s o u r c e   
 o t h e r   t h a n   A d o b e ,   t h e n   y o u r   u s e ,   m o d i f i c a t i o n , 
 o r   d i s t r i b u t i o n   o f   i t   r e q u i r e s   t h e   p r i o r   
 w r i t t e n   p e r m i s s i o n   o f   A d o b e .   
 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   
  
 l     ��������  ��  ��        l     ��������  ��  ��        l     ��������  ��  ��        l     ��  ��    ? 9 NOTE: this is not a script, but demonstrates the various     �   r   N O T E :   t h i s   i s   n o t   a   s c r i p t ,   b u t   d e m o n s t r a t e s   t h e   v a r i o u s      l     ��  ��    E ? ways in which you can manipulate text. If you want to run this     �   ~   w a y s   i n   w h i c h   y o u   c a n   m a n i p u l a t e   t e x t .   I f   y o u   w a n t   t o   r u n   t h i s      l     ��  ��    = 7 script, you must have a document with two text frames,     �   n   s c r i p t ,   y o u   m u s t   h a v e   a   d o c u m e n t   w i t h   t w o   t e x t   f r a m e s ,       l     �� ! "��   ! 7 1 each containing more than one paragraph of text.    " � # # b   e a c h   c o n t a i n i n g   m o r e   t h a n   o n e   p a r a g r a p h   o f   t e x t .    $ % $ l     ��������  ��  ��   %  & ' & l     ��������  ��  ��   '  ( ) ( l    t *���� * O     t + , + k    s - -  . / . l   �� 0 1��   0 / ) copy text from one text frame to another    1 � 2 2 R   c o p y   t e x t   f r o m   o n e   t e x t   f r a m e   t o   a n o t h e r /  3 4 3 r     5 6 5 n     7 8 7 4    �� 9
�� 
cTXa 9 m   	 
����  8 4    �� :
�� 
docu : m    ����  6 o      ���� 0 
textsource 
textSource 4  ; < ; r     = > = n     ? @ ? 4    �� A
�� 
cTXa A m    ����  @ 4    �� B
�� 
docu B m    ����  > o      ���� "0 textdestination textDestination <  C D C l   ��������  ��  ��   D  E F E l   �� G H��   G   Move a character    H � I I "   M o v e   a   c h a r a c t e r F  J K J I   #�� L M
�� .coremoveobj        obj  L n     N O N 4    �� P
�� 
cha  P m    ����  O o    ���� 0 
textsource 
textSource M �� Q��
�� 
insh Q n     R S R  ;     S o    ���� "0 textdestination textDestination��   K  T U T l  $ $��������  ��  ��   U  V W V l  $ $�� X Y��   X   Move multiple characters    Y � Z Z 2   M o v e   m u l t i p l e   c h a r a c t e r s W  [ \ [ I  $ :�� ] ^
�� .coremoveobj        obj  ] n   $ / _ ` _ 7  % /�� a b
�� 
cha  a m   ) +����  b m   , .����  ` o   $ %���� 0 
textsource 
textSource ^ �� c��
�� 
insh c n   0 6 d e d 9   4 6��
�� 
insl e n   0 4 f g f 4   1 4�� h
�� 
cha  h m   2 3����  g o   0 1���� "0 textdestination textDestination��   \  i j i l  ; ;��������  ��  ��   j  k l k l  ; ;�� m n��   m   move a word    n � o o    m o v e   a   w o r d l  p q p I  ; J�� r s
�� .coremoveobj        obj  r n   ; ? t u t 4   < ?�� v
�� 
cwor v m   = >����  u o   ; <���� 0 
textsource 
textSource s �� w��
�� 
insh w n   @ F x y x 9   D F��
�� 
insl y n   @ D z { z 4   A D�� |
�� 
cwor | m   B C����  { o   @ A���� "0 textdestination textDestination��   q  } ~ } l  K K��������  ��  ��   ~   �  l  K K�� � ���   �   Move a paragraph    � � � � "   M o v e   a   p a r a g r a p h �  � � � I  K V�� � �
�� .coremoveobj        obj  � n   K O � � � 4   L O�� �
�� 
cpar � m   M N����  � o   K L���� 0 
textsource 
textSource � �� ���
�� 
insh � n   P R � � �  :   Q R � o   P Q���� "0 textdestination textDestination��   �  � � � l  W W��������  ��  ��   �  � � � l  W W�� � ���   �   Duplicate text    � � � �    D u p l i c a t e   t e x t �  � � � I  W f�� � �
�� .coreclon****      � **** � n   W [ � � � 4   X [�� �
�� 
cha  � m   Y Z����  � o   W X���� 0 
textsource 
textSource � �� ���
�� 
insh � n   \ b � � � 8   ` b��
�� 
insl � n   \ ` � � � 4   ] `�� �
�� 
cwor � m   ^ _����  � o   \ ]���� "0 textdestination textDestination��   �  � � � l  g g��������  ��  ��   �  � � � l  g g�� � ���   � F @duplicate words 1 thru 2 of textSource to end of textDestination    � � � � � d u p l i c a t e   w o r d s   1   t h r u   2   o f   t e x t S o u r c e   t o   e n d   o f   t e x t D e s t i n a t i o n �  � � � l  g g��������  ��  ��   �  � � � I  g q�� � �
�� .coreclon****      � **** � n   g j � � � 2   h j��
�� 
cpar � o   g h���� 0 
textsource 
textSource � �� ���
�� 
insh � n   k m � � �  ;   l m � o   k l���� "0 textdestination textDestination��   �  ��� � l  r r��������  ��  ��  ��   , m      � �                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��   )  ��� � l     ��������  ��  ��  ��       �� � ���   � ��
�� .aevtoappnull  �   � **** � �� ����� � ���
�� .aevtoappnull  �   � **** � k     t � �  (����  ��  ��   �   �  �����~�}�|�{�z�y�x�w�v�u�t�s
�� 
docu
� 
cTXa�~ 0 
textsource 
textSource�} "0 textdestination textDestination
�| 
cha �{ 
�z 
insh
�y .coremoveobj        obj �x �w 
�v 
insl
�u 
cwor
�t 
cpar
�s .coreclon****      � ****�� u� q*�k/�k/E�O*�k/�l/E�O���/��6l O�[�\[Z�\Z�2����/�4l O��l/���k/�4l O��k/��5l O���/���m/�3l O��-��6l OPU ascr  ��ޭ