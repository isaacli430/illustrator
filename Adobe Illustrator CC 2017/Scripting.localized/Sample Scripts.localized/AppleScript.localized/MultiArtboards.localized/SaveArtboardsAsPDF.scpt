FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2008-2010 Adobe Systems Incorporated 
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
 C o p y r i g h t   2 0 0 8 - 2 0 1 0   A d o b e   S y s t e m s   I n c o r p o r a t e d   
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
 l     ��������  ��  ��        l     ��  ��      SaveArtboardsAsPDF.scpt     �   0   S a v e A r t b o a r d s A s P D F . s c p t      l     ��  ��    / ) Saves artboards in a new document to PDF     �   R   S a v e s   a r t b o a r d s   i n   a   n e w   d o c u m e n t   t o   P D F      l     ��������  ��  ��        l   6 ����  O    6    k   5       l   ��   !��     + % Create new document with 3 artboards    ! � " " J   C r e a t e   n e w   d o c u m e n t   w i t h   3   a r t b o a r d s   # $ # r    $ % & % I    ���� '
�� .corecrel****      � null��   ' �� ( )
�� 
kocl ( m    ��
�� 
docu ) �� *��
�� 
prdt * K     + + �� , -
�� 
caCS , m   	 
��
�� eCLSeRbM - �� . /
�� 
pSHw . m     0 0 @�       / �� 1 2
�� 
pSHh 1 m     3 3 @��      2 �� 4 5
�� 
pNAr 4 m    ����  5 �� 6 7
�� 
pALy 6 m    ��
�� eDALpGrC 7 �� 8 9
�� 
pASp 8 m     : : @4       9 �� ;��
�� 
pARC ; m    ���� ��  ��   & o      ���� 0 docref docRef $  < = < l  % %��������  ��  ��   =  > ? > l  % %�� @ A��   @ "  Add a star to each artboard    A � B B 8   A d d   a   s t a r   t o   e a c h   a r t b o a r d ?  C D C r   % 2 E F E n  % . G H G 4   ) .�� I
�� 
dIm1 I m   , -����  H 4   % )�� J
�� 
docu J m   ' (����  F o      ���� 0 artboardref artboardRef D  K L K r   3 � M N M I  3 ����� O
�� .corecrel****      � null��   O �� P Q
�� 
kocl P n  5 = R S R m   9 =��
�� 
shST S 4   5 9�� T
�� 
docu T m   7 8����  Q �� U��
�� 
prdt U K   > } V V �� W X
�� 
aiCT W J   A c Y Y  Z [ Z [   A Q \ ] \ l  A M ^���� ^ n   A M _ ` _ 4   H M�� a
�� 
cobj a m   K L����  ` n   A H b c b 1   D H��
�� 
bAl1 c o   A D���� 0 artboardref artboardRef��  ��   ] m   M P����, [  d�� d \   Q a e f e l  Q ] g���� g n   Q ] h i h 4   X ]�� j
�� 
cobj j m   [ \����  i n   Q X k l k 1   T X��
�� 
bAl1 l o   Q T���� 0 artboardref artboardRef��  ��   f m   ] `����^��   X �� m n
�� 
pRDx m m   f i���� � n �� o p
�� 
pRD2 o m   l o���� 2 p �� q r
�� 
pPTc q m   r u����  r �� s��
�� 
pSRv s m   x y��
�� boovfals��  ��   N o      ���� 	0 star1   L  t u t r   � � v w v K   � � x x �� y z
�� 
pcls y m   � ���
�� 
tRGi z �� { |
�� 
RED  { m   � ����� � | �� } ~
�� 
GREN } m   � �����   ~ �� ��
�� 
BLUE  m   � �����  ��   w o      ���� 0 	starcolor 	starColor u  � � � r   � � � � � o   � ����� 0 	starcolor 	starColor � n       � � � 1   � ���
�� 
aiFC � o   � ����� 	0 star1   �  � � � l  � ���������  ��  ��   �  � � � r   � � � � � n  � � � � � 4   � ��� �
�� 
dIm1 � m   � �����  � 4   � ��� �
�� 
docu � m   � �����  � o      ���� 0 artboardref artboardRef �  � � � r   � � � � I  ����� �
�� .corecrel****      � null��   � �� � �
�� 
kocl � n  � � � � � m   � ���
�� 
shST � 4   � ��� �
�� 
docu � m   � �����  � �� ���
�� 
prdt � K   �	 � � �� � �
�� 
aiCT � J   � � � �  � � � [   � � � � � l  � � ����� � n   � � � � � 4   � ��� �
�� 
cobj � m   � �����  � n   � � � � � 1   � ���
�� 
bAl1 � o   � ����� 0 artboardref artboardRef��  ��   � m   � �����, �  ��� � \   � � � � � l  � � ����� � n   � � � � � 4   � ��� �
�� 
cobj � m   � �����  � n   � � � � � 1   � ���
�� 
bAl1 � o   � ����� 0 artboardref artboardRef��  ��   � m   � �����^��   � �� � �
�� 
pRDx � m   � ����� � � �� � �
�� 
pRD2 � m   � ����� 2 � �� � �
�� 
pPTc � m   �����  � �� ���
�� 
pSRv � m  �
� boovfals��  ��   � o      �~�~ 	0 star2   �  � � � r  0 � � � K  , � � �} � �
�} 
pcls � m  �|
�| 
tRGi � �{ � �
�{ 
RED  � m  �z�z   � �y � �
�y 
GREN � m  !$�x�x � � �w ��v
�w 
BLUE � m  '(�u�u  �v   � o      �t�t 0 	starcolor 	starColor �  � � � r  1< � � � o  14�s�s 0 	starcolor 	starColor � n       � � � 1  7;�r
�r 
aiFC � o  47�q�q 	0 star2   �  � � � l ==�p�o�n�p  �o  �n   �  � � � r  =J � � � n =F � � � 4  AF�m �
�m 
dIm1 � m  DE�l�l  � 4  =A�k �
�k 
docu � m  ?@�j�j  � o      �i�i 0 artboardref artboardRef �  � � � r  K� � � � I K��h�g �
�h .corecrel****      � null�g   � �f � �
�f 
kocl � n MU � � � m  QU�e
�e 
shST � 4  MQ�d �
�d 
docu � m  OP�c�c  � �b ��a
�b 
prdt � K  V� � � �` � �
�` 
aiCT � J  Y{ � �  � � � [  Yi � � � l Ye ��_�^ � n  Ye � � � 4  `e�] �
�] 
cobj � m  cd�\�\  � n  Y` � � � 1  \`�[
�[ 
bAl1 � o  Y\�Z�Z 0 artboardref artboardRef�_  �^   � m  eh�Y�Y, �  ��X � \  iy � � � l iu ��W�V � n  iu � � � 4  pu�U �
�U 
cobj � m  st�T�T  � n  ip � � � 1  lp�S
�S 
bAl1 � o  il�R�R 0 artboardref artboardRef�W  �V   � m  ux�Q�Q^�X   � �P � �
�P 
pRDx � m  ~��O�O � � �N � �
�N 
pRD2 � m  ���M�M 2 � �L � �
�L 
pPTc � m  ���K�K  � �J ��I
�J 
pSRv � m  ���H
�H boovfals�I  �a   � o      �G�G 	0 star3   �  � � � r  ��   K  �� �F
�F 
pcls m  ���E
�E 
tRGi �D
�D 
RED  m  ���C�C   �B
�B 
GREN m  ���A�A   �@	�?
�@ 
BLUE	 m  ���>�> ��?   o      �=�= 0 	starcolor 	starColor � 

 r  �� o  ���<�< 0 	starcolor 	starColor n       1  ���;
�; 
aiFC o  ���:�: 	0 star3    l ���9�8�7�9  �8  �7    l ���6�6   8 2 Export the first and third artboards to PSD files    � d   E x p o r t   t h e   f i r s t   a n d   t h i r d   a r t b o a r d s   t o   P S D   f i l e s  r  �� I ���5�4
�5 .sysostflalis    ��� null�4   �3�2
�3 
prmp c  �� m  �� �   V S e l e c t   t h e   f o l d e r   t o   s a v e   t h e   P D F   f i l e s   t o : m  ���1
�1 
TEXT�2   o      �0�0 0 
destfolder 
destFolder !�/! Z  �5"#�.$" > ��%&% o  ���-�- 0 
destfolder 
destFolder& m  ��'' �((  # k  �+)) *+* r  ��,-, c  ��./. b  ��010 o  ���,�, 0 
destfolder 
destFolder1 m  ��22 �33  A r t b o a r d/ m  ���+
�+ 
TEXT- o      �*�* 0 destfile destFile+ 454 l ���)�(�'�)  �(  �'  5 676 r  �	898 K  �:: �&;<
�& 
pcls; m  ���%
�% 
tpSo< �$=�#
�$ 
p>VS= m   �"
�" boovtrue�#  9 o      �!�!  0 pdfsaveoptions pdfSaveOptions7 >� > I 
+�?@
� .coresavedocu       obj ? 4  
�A
� 
docuA m  �� @ �BC
� 
kfilB 4  �D
� 
fileD o  �� 0 destfile destFileC �EF
� 
fltpE m  �
� eDCte193F �G�
� 
pSfoG o  "%��  0 pdfsaveoptions pdfSaveOptions�  �   �.  $ I .5�H�
� .sysodisAaleR        TEXTH m  .1II �JJ * F o l d e r   d o e s   n o t   e x i s t�  �/    m     KK                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��    LML l     ����  �  �  M N�N l     ����  �  �  �       �OP�  O �

�
 .aevtoappnull  �   � ****P �	Q��RS�
�	 .aevtoappnull  �   � ****Q k    6TT  ��  �  �  R  S DK����� �� 0�� 3�������� :��������������������������������������������������������������������������'2����������������������I��
� 
kocl
� 
docu
� 
prdt
� 
caCS
�  eCLSeRbM
�� 
pSHw
�� 
pSHh
�� 
pNAr
�� 
pALy
�� eDALpGrC
�� 
pASp
�� 
pARC�� �� 
�� .corecrel****      � null�� 0 docref docRef
�� 
dIm1�� 0 artboardref artboardRef
�� 
shST
�� 
aiCT
�� 
bAl1
�� 
cobj��,��^
�� 
pRDx�� �
�� 
pRD2�� 2
�� 
pPTc�� 
�� 
pSRv�� 
�� 	0 star1  
�� 
pcls
�� 
tRGi
�� 
RED �� �
�� 
GREN
�� 
BLUE�� �� 0 	starcolor 	starColor
�� 
aiFC�� 	0 star2  �� 	0 star3  
�� 
prmp
�� 
TEXT
�� .sysostflalis    ��� null�� 0 
destfolder 
destFolder�� 0 destfile destFile
�� 
tpSo
�� 
p>VS��  0 pdfsaveoptions pdfSaveOptions
�� 
kfil
�� 
file
�� 
fltp
�� eDCte193
�� 
pSfo�� 
�� .coresavedocu       obj 
�� .sysodisAaleR        TEXT�7�3*����������m�����ma a  E` O*�k/a k/E` O*�*�k/a ,�a _ a ,a k/a _ a ,a l/a lva a a a a  a !a "fa #a  E` $Oa %a &a 'a (a )ja *ja +E` ,O_ ,_ $a -,FO*�k/a l/E` O*�*�k/a ,�a _ a ,a k/a _ a ,a l/a lva a a a a  a !a "fa #a  E` .Oa %a &a 'ja )a (a *ja +E` ,O_ ,_ .a -,FO*�k/a m/E` O*�*�k/a ,�a _ a ,a k/a _ a ,a l/a lva a a a a  a !a "fa #a  E` /Oa %a &a 'ja )ja *a (a +E` ,O_ ,_ /a -,FO*a 0a 1a 2&l 3E` 4O_ 4a 5 I_ 4a 6%a 2&E` 7Oa %a 8a 9ea E` :O*�k/a ;*a <_ 7/a =a >a ?_ :a @ AY 	a Bj CUascr  ��ޭ